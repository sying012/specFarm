package com.spring.specfarm.controller.user;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.dto.ResponseDTO;
import com.spring.specfarm.dto.UserDTO;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.jwt.JwtTokenProvider;
import com.spring.specfarm.service.user.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/idCheck")
	public String idCheck(@RequestBody User user) {
		User idCheck = userService.idCheck(user);

		if (idCheck == null) {
			return "success";
		} else {
			return "exist";
		}

	}

	@PostMapping("/telCheck")
	public String telCheck(@RequestBody User user) {
		User telCheck = userService.telCheck(user);

		if (telCheck == null) {
			String numStr = sendSMS(user);
			if (numStr != null || numStr != "") {
				return numStr;
			}

		} else {
			return "exist";
		}

		return "fail";
	}

	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody User user) {
		try {
			user.setUserPw(passwordEncoder.encode(user.getUserPw()));
			User joinUser = userService.join(user);
			if (joinUser != null) {
				return ResponseEntity.ok().body("success");
			} else 
				return ResponseEntity.ok().body("fail");
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError("join failed");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User loginUser = userService.login(user.getUserId(), user.getUserPw());

		if (loginUser != null) {
			final String token = jwtTokenProvider.create(loginUser);

			final UserDTO userDTO = new UserDTO();
			userDTO.setUserId(loginUser.getUserId());
			userDTO.setUserPw(loginUser.getUserPw());
			userDTO.setRole(loginUser.getRole());
			userDTO.setToken(token);

			return ResponseEntity.ok().body(userDTO);
		} else {
			return ResponseEntity.ok().body("fail");
		}
	}

	@PostMapping("/findUser")
	public ResponseEntity<?> findUser(@RequestBody User user) {
		User findUser = userService.findUser(user);

		if (findUser != null) {
			final UserDTO userDTO = new UserDTO();
			userDTO.setUserName(findUser.getUserName());
			userDTO.setUserId(findUser.getUserId());
			userDTO.setUserTel(findUser.getUserTel());

			return ResponseEntity.ok().body(userDTO);
		} else {
			return ResponseEntity.ok().body("fail");
		}
	}

	@PostMapping("/pwReset")
	public String pwReset(@RequestBody User user) {
		System.out.println(user);
		try {
			user.setUserPw(passwordEncoder.encode(user.getUserPw()));
			userService.pwReset(user);
			return "success";
		} catch (Exception e) {
			System.out.println(e);
			return "fail";
		}
	}

	// coolsms
	@PostMapping("/check/sendSMS")
	public String sendSMS(@RequestBody User user) {
		String phoneNumber = user.getUserTel();

		Random rand = new Random();
		String numStr = "";
		for (int i = 0; i < 4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr += ran;
		}

		System.out.println("수신자 번호 : " + phoneNumber);
		System.out.println("인증번호 : " + numStr);
//		userService.certifiedPhoneNumber(phoneNumber, numStr);
		return numStr;
	}

}
