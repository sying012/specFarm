package com.spring.specfarm.controller.community;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spring.specfarm.common.FileUtils;
import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.StudyService;

@RestController
@RequestMapping("/community/study")
public class StudyController {
	@Autowired
	StudyService studyService;

	@GetMapping("/getUser")
	public Map<String, Object> getUser(@AuthenticationPrincipal String userId) {
		try {
			User user = studyService.getUser(userId);

			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("user", user);

			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}

	}

	@PostMapping("/register")
	public Map<String, Object> insertStudy(@ModelAttribute Study study, @AuthenticationPrincipal String userId,
			HttpSession session, @RequestParam("imgFile") MultipartFile multipartFile) throws IOException {
		try {

			System.out.println(multipartFile.getOriginalFilename());

			User user = new User();
			user.setUserId(userId);
			study.setUser(user);
			

			String rootPath = session.getServletContext().getRealPath("/");

			String attachPath = "../frontend/public/upload/study/";
			File directory = new File(rootPath + attachPath);
			if (directory.exists() == false) {
				// 서버 루트 경로에 upload 폴더 만들기
				directory.mkdir();
			}
			// 첨부파일 목록 꺼내오기

			// 고유한 파일명 생성
			// 실제 서버에 저장되는 파일명
			String uuid = UUID.randomUUID().toString();
			study.setStudyImgName(uuid + multipartFile.getOriginalFilename());
			
			int studyIdx = studyService.insertStudy(study);
			// 파일 업로드 처리
			File file = new File(rootPath + attachPath + uuid + multipartFile.getOriginalFilename());

			multipartFile.transferTo(file);

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("studyIdx", studyIdx);
			return response;
		} catch (Exception e) {

			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
}
