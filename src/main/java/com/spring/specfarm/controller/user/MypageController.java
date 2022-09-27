package com.spring.specfarm.controller.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.specfarm.common.FileUtils;
import com.spring.specfarm.dto.FavCertDTO;
import com.spring.specfarm.dto.GetCertDTO;
import com.spring.specfarm.dto.ResponseDTO;
import com.spring.specfarm.dto.UserDTO;
import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.GetCert;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.AskService;
import com.spring.specfarm.service.user.MypageService;

@RestController
@RequestMapping("/mypage")
public class MypageController {
	@Autowired
	private MypageService mypageService;
	
	@Autowired
	private AskService askService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("")
	public Map<String, Object> getUserData(@AuthenticationPrincipal String userId) {
		try {
			Map<String, Object> responseMap = new HashMap<String, Object>();
			User loginedUser = mypageService.getUser(userId);
			responseMap.put("user", loginedUser);
			
			List<GetCert> earnedCert = mypageService.getEarnedCert(userId);
			List<GetCertDTO> earnCertDTOs = new ArrayList<GetCertDTO>();
			for(int i=0; i < earnedCert.size(); i++) {
				GetCertDTO getCertDTO = new GetCertDTO();
				getCertDTO.setGetCertIdx(i);
				getCertDTO.setUserId(userId);
				getCertDTO.setCertName(earnedCert.get(i).getCertName());
				getCertDTO.setGetCertDate(earnedCert.get(i).getGetCertDate());
				
				earnCertDTOs.add(getCertDTO);
			}
			responseMap.put("earnedCert", earnCertDTOs);
			
			List<Ask> writtenAsks = mypageService.getWrittenAsks(loginedUser);
			for(Ask ask: writtenAsks) {
				ask.setCountReply(askService.getAskReplyCount(ask.getAskIdx()));
			}
			responseMap.put("writtenAsks", writtenAsks);
			
			List<Share> writtenShares = mypageService.getWrittenShares(loginedUser);
			responseMap.put("writtenShares", writtenShares);
			
			List<FavCertDTO> favCerts = mypageService.getFavCerts(userId);
			responseMap.put("favCerts", favCerts);
			
			return responseMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			
			return errorMap;
		}
	}
	
	@PostMapping("/smInfo")
	public Map<String, Object> getSmallUser(@RequestBody User user) {
		try {
			Map<String, Object> responseMap = new HashMap<String, Object>();
			
			String userId = user.getUserId();
			
			User loginedUser = mypageService.getUser(userId);
			responseMap.put("user", loginedUser);
			
			List<GetCert> earnedCert = mypageService.getEarnedCert(userId);
			List<GetCertDTO> earnCertDTOs = new ArrayList<GetCertDTO>();
			for(int i=0; i < earnedCert.size(); i++) {
				GetCertDTO getCertDTO = new GetCertDTO();
				getCertDTO.setGetCertIdx(i);
				getCertDTO.setUserId(userId);
				getCertDTO.setCertName(earnedCert.get(i).getCertName());
				getCertDTO.setGetCertDate(earnedCert.get(i).getGetCertDate());
				
				earnCertDTOs.add(getCertDTO);
			}
			responseMap.put("earnedCert", earnCertDTOs);
			
			List<FavCertDTO> favCerts = mypageService.getFavCerts(userId);
			responseMap.put("favCerts", favCerts);
			
			return responseMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			
			return errorMap;
		}
	}
	
	
	@GetMapping("/modify")
	public ResponseEntity<?> getUserNickAndProfile(@AuthenticationPrincipal String userId) {
		try {
			User loginedUser = mypageService.getUser(userId);
			
			return ResponseEntity.ok().body(loginedUser);
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/nickCheck")
	public String nickCheck(@RequestBody User user) {
		User nickCheck = mypageService.nickCheck(user.getUserNick());
		
		if (nickCheck == null) {
			return "success";
		} else {
			return "exist";
		}
	}
	
	@PostMapping("/modify")
	public ResponseEntity<?> editUserMdf(@ModelAttribute User user, MultipartFile profileImage, Boolean checkChange, HttpSession session) {
		try {
			if (!profileImage.isEmpty()) {				
				FileUtils fileUtils = new FileUtils();
				user.setUserProfileName(fileUtils.parseFileInfo(session, profileImage, "profile").get("FileName"));
			} 
			
			if(checkChange) {
				user.setUserNick(user.getUserNick());
				if(user.getUserProfileName().isEmpty()) {
					user.setUserProfileName("farmer.png");
				}
			}
			
			mypageService.editUserMdf(user);
			
			return ResponseEntity.ok().body("렛츠 수정");
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/editUserInfo")
	public ResponseEntity<?> editUserInfo(@RequestBody User user) {
		try {
			mypageService.editUserMdf(user);
			
			return ResponseEntity.ok().body("수정 완");
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/earnedcert/{userId}")
	public ResponseEntity<?> editUserInfo(@PathVariable("userId") String userId, @RequestBody List<GetCert> earnedCert) {
		try {
			if(earnedCert.isEmpty() || !mypageService.getEarnedCert(userId).isEmpty()) {
				mypageService.resetEarnedCert(userId);
			} 
			mypageService.editUserGetCert(earnedCert);
			
			return ResponseEntity.ok().body("유저자격증 렛츠 수정");
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/deletefavcert")
	public ResponseEntity<?> deleteFavCert(@RequestBody String[] favCert) {
		try {
			String certIdx = favCert[0];
			String userId = favCert[1];
			mypageService.deleteFavCert(certIdx, userId);
			
			List<FavCertDTO> favCerts = mypageService.getFavCerts(userId);
			
			return ResponseEntity.ok().body(favCerts);
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/resetpassword")
	public ResponseEntity<?> editUserPw(@RequestBody String[] userInfo) {
		try {
			String userId = userInfo[0];
			String pastPw = userInfo[1];
			String newPw = userInfo[2];
			
			User loginedUser = mypageService.getUser(userId);
			if(mypageService.pwCheck(userId, pastPw)) {
				loginedUser.setUserPw(passwordEncoder.encode(newPw));
				mypageService.editUserMdf(loginedUser);
				return ResponseEntity.ok().body("correctPassword");
			} else {
				return ResponseEntity.ok().body("wrongPassword");
			}
			
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/deactivate")
	public ResponseEntity<?> deactivateUser(@RequestBody String[] userInfo) {
		try {
			String userId = userInfo[0];
			String userPw = userInfo[1];
			
			User loginedUser = mypageService.getUser(userId);
			
			if(mypageService.pwCheck(userId, userPw)) {
				loginedUser.setUserYn("N");
				mypageService.editUserMdf(loginedUser);
				return ResponseEntity.ok().body("correctPassword");
			} else {
				return ResponseEntity.ok().body("wrongPassword");
			}
			
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}

}
