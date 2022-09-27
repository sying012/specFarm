package com.spring.specfarm.controller.admin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Help;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.admin.AdminService;
import com.spring.specfarm.service.community.AskService;
import com.spring.specfarm.service.community.ShareService;
import com.spring.specfarm.service.community.StudyService;
import com.spring.specfarm.service.notice.HelpService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	AdminService adminService;
	
	@Autowired
	StudyService studyService; 

	@Autowired
	AskService askService;
	
	@Autowired
	ShareService shareService;
	
	@Autowired
	HelpService helpService; 
	
	//날짜 계산
	private static String AddDate(String form, String strDate, int year, int month, int day) throws Exception {

		SimpleDateFormat dtFormat = new SimpleDateFormat(form);

		Calendar cal = Calendar.getInstance();

		Date dt = dtFormat.parse(strDate);

		cal.setTime(dt);

		cal.add(Calendar.YEAR, year);
		cal.add(Calendar.MONTH, month);
		cal.add(Calendar.DATE, day);

		return dtFormat.format(cal.getTime());
	}

//	User관리 /////////////////////////////////////////////
	@GetMapping("/user")
	public Map<String, Object> getUser(@PageableDefault(page = 0, size = 15, sort="userRegDate" ,direction=Direction.DESC) Pageable pageable){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			Page<User> userList = adminService.getUserList(pageable);
			int totalUser = adminService.getUserCount();
			
			resultMap.put("userList", userList);
			resultMap.put("totalUser",totalUser);
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//7일, 한달 신규가입자 수 반환
	@GetMapping("/newUser")
	public Map<String, Object> getNewUser(){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm");
			String now = dtFormat.format(new Date());
			String dateW = AddDate("yyyy.MM.dd HH:mm",now, 0, 0, -7);
			String dateM = AddDate("yyyy.MM.dd HH:mm",now, 0, -1, 0);
			
			int newUserW = adminService.getNewUserW(dateW);
			int newUserM = adminService.getNewUserM(dateM);
	
			resultMap.put("newUserW", newUserW);
			resultMap.put("newUserM",newUserM);
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//최근 7일간 일 별로 신규가입자 수 반환
	@GetMapping("/chartUser")
	public Map<String, Object> getNewChartUser(){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();

			List<Map<String, Object>> list = new ArrayList<>();
			SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy.MM.dd");
			
			String now = dtFormat.format(new Date());

			for(int i =-10; i<=-1; i++) {
				Map<String, Object> userMap = new HashMap<String, Object>();
				String date = AddDate("yyyy.MM.dd",now, 0, 0, i);
				int count = adminService.getDayNewUser(date);
				userMap.put("x", date);
				userMap.put("y", count);
				list.add(userMap);
			}
			
			resultMap.put("userList",list);
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	

//	Board관리 /////////////////////////////////////////////
	//게시판 통합 정보반환
	@GetMapping("/boardTotal")
	public Map<String, Object> getBoardTotal(){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
		
			int studyTotal= adminService.getStudyTotal();//스터디 게시글의 개수 반환
			int askTotal= adminService.getAskTotal();//물어방 게시글의 개수 반환
			int shareTotal= adminService.getShareTotal();//나눔 게시글의 개수 반환
			
			SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm");
			String now = dtFormat.format(new Date());
			String dateW = AddDate("yyyy.MM.dd HH:mm",now, 0, 0, -7); //조회일로부터 일주일전 날짜 계산
			
			int newStudy = adminService.getNewStudyCount(dateW); //스터디 일주일간 신규 게시물 개수
			int newAsk = adminService.getNewAskCount(dateW); //물어방 일주일간 신규 게시물 개수
			int newShare = adminService.getNewShareCount(dateW); //나눔 일주일간 신규 게시물 개수
			
			int newReplyAsk = adminService.getNewAskReplyCount(dateW) + adminService.getNewAskReReplyCount(dateW);; //물어방 일주일간 신규 댓글 개수 + 대댓글 개수
			int newReplyShare = adminService.getNewShareReplyCount(dateW) + adminService.getNewShareReReplyCount(dateW);; //나눔 일주일간 신규 댓글 개수 + 대댓글 개수
			
			resultMap.put("boardTotal", studyTotal+askTotal+shareTotal); //총 게시글 수
			resultMap.put("newStudy", newStudy); //7일간 스터티 신규 글 수
			resultMap.put("newAsk", newAsk); //7일간 물어방 신규 글 수
			resultMap.put("newShare", newShare); //7일간 나눔 신규 글 수
			resultMap.put("newTotal", newStudy+newAsk+newShare); //7일간 총 신규 게시글 수
			resultMap.put("newReply", newReplyAsk+newReplyShare); //7일간 스터티 신규 댓글 수
			resultMap.put("newReplyAsk", newReplyAsk); //7일간 물어방 신규 댓글 수
			resultMap.put("newReplyShare", newReplyShare); //7일간 나눔 신규 댓글 수
			
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//스터디 정보 반환
	@GetMapping("/study")
	public Map<String, Object> getAdminStudy(@PageableDefault(page = 0, size = 10, sort="studyIdx" ,direction=Direction.DESC) Pageable pageable){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			
			Page<Study> studyList = studyService.getStudyList("", pageable);			
			
			resultMap.put("studyList", studyList);
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//물어방 정보 반환
	@GetMapping("/ask")
	public Map<String, Object> getAdminAsk(@PageableDefault(page = 0, size = 10, sort="askIdx" ,direction=Direction.DESC) Pageable pageable){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			
			Page<Ask> askList = askService.getAskList(null, null, pageable);
			
//			for(Ask ask: askList) {	
//				ask.setCountReply(askService.getAskReplyCount(ask.getAskIdx()));
//			}
			
			
			resultMap.put("askList", askList);
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//나눔 정보 반환
	@GetMapping("/share")
	public Map<String, Object> getAdminShare(@PageableDefault(page = 0, size = 10, sort="shareIdx" ,direction=Direction.DESC) Pageable pageable){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			
			Page<Share> shareList = shareService.getShareList(null, pageable);
			
//			for(Ask ask: shareList) {	
//				ask.setCountReply(shareService.getAskReplyCount(ask.getAskIdx()));
//			}
			
			resultMap.put("shareList", shareList);
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
//	help관리 /////////////////////////////////////////////
	//미답변 1대1 문의 반환
	@GetMapping("/help")
	public Map<String, Object> getHelp(@PageableDefault(page = 0, size = 10 , sort="helpIdx", direction=Direction.DESC) Pageable pageable){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			
			Page<Help> helpList = helpService.getNonReplyHelpList(pageable);
			
			resultMap.put("helpList", helpList);
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//답변 1대1 문의 반환
	@GetMapping("/replyHelp")
	public Map<String, Object> getReplyHelp(@PageableDefault(page = 0, size = 10 ,sort="helpIdx",direction=Direction.DESC) Pageable pageable){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			
			Page<Help> helpReplyList = helpService.getReplyHelpList(pageable);
			
			resultMap.put("helpReplyList", helpReplyList);
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	@PostMapping("/insertAnswer")
	public String insertAnswer(@RequestBody Help help) {
		try {
			helpService.insertHelp(help);
			return "success";
		} catch (Exception e) {
			return "error";
		}
	}
}
