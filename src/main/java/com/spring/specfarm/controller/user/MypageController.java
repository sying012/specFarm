package com.spring.specfarm.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.dto.ResponseDTO;
import com.spring.specfarm.dto.UserDTO;
import com.spring.specfarm.entity.GetCert;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.user.MypageService;

@RestController
@RequestMapping("/mypage")
public class MypageController {
	@Autowired
	private MypageService mypageService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("/")
	public Map<String, Object> getUserData(@AuthenticationPrincipal String userId) {
		try {
			Map<String, Object> responseMap = new HashMap<String, Object>();
			User loginedUser = mypageService.getUser(userId);
			loginedUser.setUserNick(loginedUser.getUserNick() == null || loginedUser.getUserNick() == "" ? loginedUser.getUserId() : loginedUser.getUserNick());
			responseMap.put("user", loginedUser);
			
			List<GetCert> earnedCert = mypageService.getEarnedCert(userId);
			responseMap.put("earnedCert", earnedCert);
//			UserDTO userDTO = new UserDTO();
//			userDTO.setUserId(loginedUser.getUserId());
//			userDTO.setUserPw(loginedUser.getUserPw());
//			userDTO.setUserName(loginedUser.getUserName());
//			userDTO.setUserTel(loginedUser.getUserTel());
//			userDTO.setUserEmail(loginedUser.getUserEmail());
//			userDTO.setUserNick(loginedUser.getUserNick() == null ? loginedUser.getUserId() : loginedUser.getUserNick());
//			userDTO.setFavFieldL(loginedUser.getFavFieldL());
//			userDTO.setFavFieldM(loginedUser.getFavFieldM());
//			userDTO.setUserProfileName(loginedUser.getUserProfileName());
//			userDTO.setRole(loginedUser.getRole());
//			
//			System.out.println("유저디티오: " + userDTO);
			
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
			loginedUser.setUserNick(loginedUser.getUserNick() == null || loginedUser.getUserNick() == "" ? loginedUser.getUserId() : loginedUser.getUserNick());
			
//			UserDTO userDTO = new UserDTO();
//			userDTO.setUserId(loginedUser.getUserId());
//			userDTO.setUserPw(loginedUser.getUserPw());
//			userDTO.setUserName(loginedUser.getUserName());
//			userDTO.setUserTel(loginedUser.getUserTel());
//			userDTO.setUserEmail(loginedUser.getUserEmail());
//			userDTO.setUserNick(loginedUser.getUserNick() == null ? loginedUser.getUserId() : loginedUser.getUserNick());
//			userDTO.setFavFieldL(loginedUser.getFavFieldL());
//			userDTO.setFavFieldM(loginedUser.getFavFieldM());
//			userDTO.setUserProfileName(loginedUser.getUserProfileName());
//			userDTO.setRole(loginedUser.getRole());
			
			return ResponseEntity.ok().body(loginedUser);
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/modify")
	public ResponseEntity<?> editUserMdf(@RequestBody User user) {
		try {
			mypageService.editUserMdf(user);
			
			return ResponseEntity.ok().body("렛츠 수정");
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/earnedcert")
	public ResponseEntity<?> editUserInfo(@RequestBody List<GetCert> earnedCert) {
		try {
			System.out.println("11111111111111");
			if(earnedCert.isEmpty() || !mypageService.getEarnedCert(earnedCert.get(0).getUserId()).isEmpty()) {
				System.out.println("3333333333333333");
				mypageService.resetEarnedCert(earnedCert.get(0).getUserId());
			}
			mypageService.editUserGetCert(earnedCert);
			System.out.println("취득자격증리스트" + earnedCert);
			
			return ResponseEntity.ok().body("유저자격증 렛츠 수정");
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
			
			System.out.println("deactivate" + userPw);
			System.out.println("deactivate" + userId);
			System.out.println("deactivate" + loginedUser);
			
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
