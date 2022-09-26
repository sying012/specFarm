package com.spring.specfarm.controller.admin;

import java.util.HashMap;
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
	
	
//	Board관리 /////////////////////////////////////////////
	//게시판 통합 정보반환
	@GetMapping("/boardTotal")
	public Map<String, Object> getBoardTotal(){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
		
			int studyTotal= adminService.getStudyTotal();//스터디 게시글의 개수 반환
			int askTotal= adminService.getAskTotal();//물어방 게시글의 개수 반환
			int shareTotal= adminService.getShareTotal();//나눔 게시글의 개수 반환
			
			resultMap.put("studyTotal", studyTotal);
			resultMap.put("askTotal", askTotal);
			resultMap.put("shareTotal", shareTotal);
			
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
