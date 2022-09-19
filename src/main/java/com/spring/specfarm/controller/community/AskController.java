package com.spring.specfarm.controller.community;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.dto.ResponseDTO;
import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.AskReReply;
import com.spring.specfarm.entity.AskReply;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.AskService;

@RestController
@RequestMapping("/community/ask")
public class AskController {
	@Autowired
	AskService askService;
	
	@GetMapping("/getUser")
	public Map<String, Object> getUser(@AuthenticationPrincipal String userId){
		try {
			User user = askService.getUser(userId);
			
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("user", user);
		
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
		
	}
	
	//Ask 리스트 반환
	@GetMapping("")
	public Map<String, Object> getAsk(@PageableDefault(page = 0, size = 8, sort="askIdx" ,direction=Direction.DESC) Pageable pageable, @RequestParam String searchType, @RequestParam(required = false) String searchKeyword ) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			System.out.println(searchType);
			System.out.println(searchKeyword);
			
			
			Page<Ask> askList = askService.getAskList(searchType, searchKeyword, pageable);
			
			for(Ask ask: askList) {	
				ask.setCountReply(askService.getAskReplyCount(ask.getAskIdx()));
			}
			
			
			resultMap.put("askList", askList);
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}

	//Ask 글작성
	@PostMapping("/write")
	public Map<String, Object> insertAsk(@ModelAttribute Ask ask, @AuthenticationPrincipal String userId) {
		try {
			
			System.out.println(userId+"gg");
			User user = new User();
			user.setUserId(userId);
			ask.setUser(user);
			int askIdx = askService.insertAsk(ask);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("askIdx", askIdx);
			return response;
		} catch (Exception e) {

			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//Ask 반환(상세페이지)
	@GetMapping("/getAsk")
	public ResponseEntity<?> getAsk(int askIdx) {
		try {
			Ask ask = askService.getAsk(askIdx);
		
			return ResponseEntity.ok().body(ask);
		} catch (Exception e) {
			ResponseDTO<Ask> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	//Ask에 해당하는 댓글 리스트 반환
	@GetMapping("/reply/{id}")
	public ResponseEntity<?> getReply(@PathVariable int id) {
		System.out.println(id);
		try {
			List<AskReply> askReplyList = askService.getAskReplyList(id);
		
			ResponseDTO<AskReply> response = new ResponseDTO<>();
			
			response.setData(askReplyList);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			ResponseDTO<AskReply> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	//Ask에 해당하는 대댓글 리스트 반환
	@GetMapping("/{id}/rereply")
	public ResponseEntity<?> getReReply(@PathVariable int id, @RequestParam int replyIdx) {
		System.out.println(id);
		try {
			List<AskReReply> askReReplyList = askService.getAskReReplyList(id, replyIdx);

			ResponseDTO<AskReReply> response = new ResponseDTO<>();
			response.setData(askReReplyList);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			ResponseDTO<AskReply> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	//Ask에 댓글 작성
	@PostMapping("/{askIdx}/insertReply")
	public Map<String, Object> insertReply(@PathVariable int askIdx, @RequestBody AskReply askReply, @AuthenticationPrincipal String userId) {
		try {
			askReply.setUser(askService.getUser(userId));
			askReply.setAskIdx(askIdx);
			askReply.setAskReplyIdx(askService.getAskReplyIdx(askIdx));
			
			List<AskReply> askReplyList = askService.insertAskReply(askReply);
			
			Map<String, Object> response = new HashMap<String, Object>();
			
			response.put("askReplyList", askReplyList);
		
			return response;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//Ask에 대댓글 작성
		@PostMapping("/{askIdx}/insertReReply")
		public Map<String, Object> insertReReply(@PathVariable int askIdx, @RequestBody AskReReply askReReply, @AuthenticationPrincipal String userId) {
			try {
				User user = new User();
				user.setUserId(userId);
				askReReply.setUser(user);
			    
				askReReply.setAskReReplyIdx(askService.getAskReReplyIdx(askIdx,askReReply.getAskReply().getAskReplyIdx()));
				
				List<AskReReply> askReReplyList = askService.insertAskReReply(askReReply);
				System.out.println(askReReplyList);
				Map<String, Object> response = new HashMap<String, Object>();
				
				response.put("askReReplyList", askReReplyList);
			
				return response;
			} catch (Exception e) {
				Map<String, Object> errorMap = new HashMap<String, Object>();
				errorMap.put("error",e.getMessage());
				return errorMap;
			}
		}
		
		//Ask 삭제
		@DeleteMapping("/delete")
		public Map<String, Object> deleteAsk(@RequestParam int askIdx){
			try {
				askService.deleteAsk(askIdx);
				Map<String, Object> response = new HashMap<String, Object>();
				
				response.put("data", "success");
			
				return response;
			} catch (Exception e) {
				Map<String, Object> errorMap = new HashMap<String, Object>();
				errorMap.put("error",e.getMessage());
				return errorMap;
			}
		}
}
