package com.spring.specfarm.controller.user;

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
	public ResponseEntity<?> idCheck(@RequestBody User user) {
		User idCheck= userService.idCheck(user);
		
		if(idCheck == null) {
			return ResponseEntity.ok().body("success");
		} else {
			return ResponseEntity.ok().body("failed");
		}
		
	}
	
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody User user) {
		System.out.println(user);
		try {
			user.setUserPw(passwordEncoder.encode(user.getUserPw()));
						
			User joinUser = userService.join(user);
			
			UserDTO userDTO = new UserDTO();
			userDTO.setUserId(joinUser.getUserId());
			userDTO.setUserName(joinUser.getUserName());
			userDTO.setRole(joinUser.getRole());
			
			return ResponseEntity.ok().body(userDTO);
		} catch (Exception e) {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError("join failed");
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User loginUser = userService.login(user.getUserId(), user.getUserPw());
		
		if(loginUser != null) {
			final String token = jwtTokenProvider.create(loginUser);
			
			final UserDTO userDTO = new UserDTO();
			userDTO.setUserId(loginUser.getUserId());
			userDTO.setUserPw(loginUser.getUserPw());
			userDTO.setRole(loginUser.getRole());
			userDTO.setToken(token);
			
			return ResponseEntity.ok().body(userDTO);
		} else {
			ResponseDTO<UserDTO> response = new ResponseDTO<>();
			response.setError("login failed");
			return ResponseEntity.badRequest().body(response);
		}
	}

}
