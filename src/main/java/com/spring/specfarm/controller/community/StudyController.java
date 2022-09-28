package com.spring.specfarm.controller.community;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.StudyApply;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.StudyService;

@RestController
@RequestMapping("/community/study")
public class StudyController {
	@Autowired
	StudyService studyService;

	@GetMapping("/getUser")
	public User getUser(@AuthenticationPrincipal String userId) {

		User user = studyService.getUser(userId);

		return user;

	}

	@GetMapping("")
	public Map<String, Object> getStudyList(
			@PageableDefault(page = 0, size = 8, sort = "studyIdx", direction = Direction.DESC) Pageable pageable,
			@RequestParam String searchKeyword) {
		try {
			System.out.println(searchKeyword + "    getStudyListgetStudyListgetStudyList");
			Page<Study> studyList = studyService.getStudyList(searchKeyword, pageable);
			System.out.println(studyList);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("studyList", studyList);

			return response;

		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@GetMapping("/getStudy")
	public Map<String, Object> getStudy(@RequestParam("id") int studyIdx) {
		try {

			Map<String, Object> resultMap = new HashMap<String, Object>();

			Study study = studyService.getStudy(studyIdx);
			
			study.setStudyCount(study.getStudyCount()+1);
			
			studyService.insertStudy(study);

			resultMap.put("study", study);

			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@GetMapping("/getStudyMemberList")
	public Map<String, Object> getStudyMemberList(@RequestParam("id") int studyIdx) {
		try {
//			System.out.println(studyIdx + "studyIdxstudyIdxstudyIdx");
			Map<String, Object> resultMap = new HashMap<String, Object>();

			List<StudyApply> studyMemberList = studyService.getStudyMemberList(studyIdx);

			resultMap.put("studyMemberList", studyMemberList);

			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@PostMapping("/register")
	public Map<String, Object> insertStudy(@ModelAttribute Study study, @AuthenticationPrincipal String userId,
			HttpSession session, @RequestParam("imgFile") MultipartFile multipartFile,
			@PageableDefault(page = 0, size = 8, sort = "studyIdx", direction = Direction.DESC) Pageable pageable)
			throws IOException {
		try {

			User user = getUser(userId);
			study.setUser(user);

			String rootPath = session.getServletContext().getRealPath("/");

			String attachPath = "../frontend/public/upload/study/";
			File directory = new File(rootPath + attachPath);
			if (directory.exists() == false) {
				// 서버 루트 경로에 upload 폴더 만들기
				directory.mkdir();
			}
			// 첨부파일이 있는 경우에만 DB에 파일이름 저장
			if (multipartFile.getOriginalFilename() != "") {

				// 고유한 파일명 생성
				// 실제 서버에 저장되는 파일명
				String uuid = UUID.randomUUID().toString();
				// 파일명에 공백이 있으면 렌더링 시 파일을 못찾아 "_"로 변환
				String rmSpaceFileName = multipartFile.getOriginalFilename().replace(" ", "_");
				study.setStudyImgName(uuid + rmSpaceFileName);

				// 파일 업로드 처리
				File file = new File(rootPath + attachPath + uuid + rmSpaceFileName);

				multipartFile.transferTo(file);
			} else {
				study.setStudyImgName("defalut_study_image.png");
			}

			int studyIdx = studyService.insertStudy(study);

			Page<Study> studyList = studyService.getStudyList("", pageable);

			insertStudyMember(userId, studyIdx, 1);

			List<StudyApply> studyMemberList = studyService.getStudyMemberList(studyIdx);

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("studyIdx", studyIdx);
			response.put("studyList", studyList);
			response.put("studyMemberList", studyMemberList);

			return response;
		} catch (Exception e) {

			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@PostMapping("/edit")
	public Map<String, Object> editStudy(@ModelAttribute Study study, HttpSession session,
			@RequestParam("imgFile") MultipartFile multipartFile,
			@PageableDefault(page = 0, size = 8, sort = "studyIdx", direction = Direction.DESC) Pageable pageable)
			throws IOException {
		try {
			System.out.println(study);

			String rootPath = session.getServletContext().getRealPath("/");

			String attachPath = "../frontend/public/upload/study/";
			File directory = new File(rootPath + attachPath);
			if (directory.exists() == false) {
				// 서버 루트 경로에 upload 폴더 만들기
				directory.mkdir();
			}
			// 첨부파일이 있는 경우에만 DB에 파일이름 저장
			if (multipartFile.getOriginalFilename() != "") {

				// 고유한 파일명 생성
				// 실제 서버에 저장되는 파일명
				String uuid = UUID.randomUUID().toString();
				// 파일명에 공백이 있으면 렌더링 시 파일을 못찾아 "_"로 변환
				String rmSpaceFileName = multipartFile.getOriginalFilename().replace(" ", "_");
				study.setStudyImgName(uuid + rmSpaceFileName);

				// 파일 업로드 처리
				File file = new File(rootPath + attachPath + uuid + rmSpaceFileName);

				multipartFile.transferTo(file);
			} 			
			
			int studyIdx = studyService.insertStudy(study);

			Page<Study> studyList = studyService.getStudyList("", pageable);

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("studyIdx", studyIdx);
			response.put("studyList", studyList);

			return response;
		} catch (Exception e) {

			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@DeleteMapping("/delete")
	public Map<String, Object> deleteStudy(@RequestParam("id") int studyIdx,
			@PageableDefault(page = 0, size = 8, sort = "studyIdx", direction = Direction.DESC) Pageable pageable) {
		try {

			Map<String, Object> resultMap = new HashMap<String, Object>();

			Page<Study> studyList = studyService.deleteStudy(studyIdx, pageable);

			resultMap.put("studyList", studyList);

			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@GetMapping("/studyJoin")
	public Map<String, Object> insertStudyMember(@RequestParam String userId, @RequestParam int studyIdx,
			@RequestParam int acceptYn) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();

			// 로그인 중인 유저 엔티티 가져오기
			User user = getUser(userId);

			// 로그인 된 유저가 idx에 해당하는 스터디에 있는지 확인 후 있으면 해당 스터디 반환
			// 없으면 새로운 Apply 객체 생성 (new StudyApply 반환)
			StudyApply studyApply = studyService.getStudyApply(studyIdx, userId);

			// 스터디에 가입되어 있지 않은 경우
			if (studyApply.getStudyApplyIdx() == 0) {
//				studyApply = new StudyApply();
				// 현재 스터디 idx 설정
				studyApply.setStudyApplyIdx(studyService.getStudyApplyIdx(studyIdx));
				// 가입 신청할 유저 설정
				studyApply.setUser(user);
				// 신청한 스터디 idx 설정
				studyApply.setStudyIdx(studyIdx);
			}
			// 스터디 미가입일 때 : 0
			// 스터디 가입신청일 때 : 1
			studyApply.setAcceptYn(acceptYn);

			// 스터디 멤버 리스트 업데이트
			List<StudyApply> studyMemberList = studyService.insertStudyMember(studyApply);

			// 현재 스터디 가져오기
			Study study = studyService.getStudy(studyIdx);
			System.out.println(study.getStudyMemberCnt() + "= 신청 수락 전 멤버 수");
			// 가입 신청 상태인 경우 현재 멤버 수에 +1 해서 저장
			if (studyApply.getAcceptYn() == 1) {
				study.setStudyMemberCnt(study.getStudyMemberCnt() + 1);
				System.out.println(study.getStudyMemberCnt() + "= 신청 수락 후 멤버 +1");
			}

			// 현재 멤버 수가 최대 멤버 수와 같아지면 스터디 마감
			if (study.getStudyMaxMember() == study.getStudyMemberCnt()) {
				study.setStudyYn("N");
				
//				// 신청 목록 초기화
//				for (StudyApply studyMember : studyMemberList) {
//					if(studyMember.getAcceptYn() == 0) {
//						studyMemberList = studyService.cancelJoin(studyIdx, studyMember.getUser().getUserId());
//					}
//				}
				
			}

			// 업데이트 된 스터디 저장
			studyService.insertStudy(study);

			// 업데이트 된 스터디 다시 가져오기
			study = studyService.getStudy(studyIdx);
			
			System.out.println(study.getStudyMemberCnt() + "= 스터디 업데이트 후 멤버 수");

			resultMap.put("studyMemberList", studyMemberList);
			resultMap.put("study", study);

			return resultMap;

		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	@DeleteMapping("/cancelJoin")
	public Map<String, Object> cancelJoin(@RequestParam int studyIdx, @RequestParam String userId) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			List<StudyApply> studyMemberList = studyService.cancelJoin(studyIdx, userId);

			Study study = studyService.getStudy(studyIdx);

			study.setStudyMemberCnt(study.getStudyMemberCnt() - 1);

			if (study.getStudyMaxMember() > study.getStudyMemberCnt()) {
				study.setStudyYn("Y");
			}

			studyService.insertStudy(study);

			study = studyService.getStudy(studyIdx);
			studyMemberList = studyService.getStudyMemberList(studyIdx);

			resultMap.put("studyMemberList", studyMemberList);
			resultMap.put("study", study);

			return resultMap;

		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
}
