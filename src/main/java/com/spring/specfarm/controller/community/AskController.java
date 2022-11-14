package com.spring.specfarm.controller.community;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
import org.springframework.web.multipart.MultipartFile;

import com.spring.specfarm.common.FileUtils;
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
	
	//Ask 리스트 반환
	@GetMapping("")
	public Map<String, Object> getAskList(@PageableDefault(page = 0, size = 8, sort="askIdx" ,direction=Direction.DESC) Pageable pageable, @RequestParam String searchType, @RequestParam(required = false) String searchKeyword ) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();			
			
			Page<Ask> askList = askService.getAskList(searchType, searchKeyword, pageable);
			
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
			
			ask.setAskCount(ask.getAskCount()+1);
			askService.insertAsk(ask);
		
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
			
			Ask ask = askService.getAsk(askIdx);
			ask.setCountReply(ask.getCountReply()+1);
			askService.insertAsk(ask);
			
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
			    
				askReReply.setAskReReplyIdx(askService.getAskReReplyIdx(askIdx,askReReply.getAskReply().getAskReplyIdx())); // 작성될 대댓글의 idx값 반환
				AskReply newAskReply = askReReply.getAskReply(); // askReply 대댓글 수를 업데이트하기위해 새로운 AskReply객체 생성
				newAskReply.setCountReReply(askService.getAskReReplyCount(newAskReply)+1); // 대댓글 수 업데이트
				askReReply.setAskReply(newAskReply); // 대댓글 수 없데이트된객체로 세트
				
				
				Ask ask = askService.getAsk(askIdx);
				ask.setCountReply(ask.getCountReply()+1);
				
				List<AskReReply> askReReplyList = askService.insertAskReReply(askReReply);
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
		
		//Ask 이미지 업로드
		@PostMapping("/upload/images")
		public Map<String, Object> uploadImages(@ModelAttribute MultipartFile image, HttpSession session){
			try {
				
				FileUtils fileUtils = new FileUtils();
				
				String fileName = (fileUtils.parseFileInfo(session, image, "community/ask").get("FileName"));
				
				Map<String, Object> response = new HashMap<String, Object>();
				response.put("file", fileName);
				
				return response;
				
			}catch(Exception e){
				Map<String, Object> errorMap = new HashMap<String, Object>();
				errorMap.put("error",e.getMessage());
				return errorMap;
			}
		}
		
		//Ask 이미지 삭제
		@PostMapping("/delete/images")
		public Map<String, Object> deleteImages(@RequestBody List<String> imagesList, HttpSession session) {
			try {
				
				String rootPath = session.getServletContext().getRealPath("/");

				String attachPath = "../frontend/public/upload/community/ask/";
				for (String name : imagesList) {
					File file = new File(rootPath+attachPath+name);

					if (file.exists()) {
						if (file.delete()) {
							System.out.println("파일삭제 성공");
						} else {
							System.out.println("파일삭제 실패");
						}
					} else {
						System.out.println("파일이 존재하지 않습니다.");
					}
				}

				Map<String, Object> response = new HashMap<String, Object>();
				response.put("result", "success");

				return response;

			} catch (Exception e) {
				Map<String, Object> errorMap = new HashMap<String, Object>();
				errorMap.put("error", e.getMessage());
				return errorMap;
			}
		}
}
