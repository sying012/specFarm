package com.spring.specfarm.controller.user;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
import com.spring.specfarm.entity.FavCert;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.jwt.JwtTokenProvider;
import com.spring.specfarm.service.user.UserService;

import edu.emory.mathcs.backport.java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	// user 가져오기
	@GetMapping("/getUser")
	public Map<String, Object> getUser(@AuthenticationPrincipal String userId) {
		Map<String, Object> response = new HashMap<String, Object>();
		
		User user = userService.getUser("aaa");
		response.put("user", user);
		
		return response;
	}

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
		try {
			user.setUserPw(passwordEncoder.encode(user.getUserPw()));
			userService.pwReset(user);
			return "success";
		} catch (Exception e) {
//			System.out.println(e);
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
	
	@GetMapping("/getFavCert")
	public List<Map<String, Object>> getFavCert(@AuthenticationPrincipal String userId) throws ParseException {
		if (userId == "anonymousUser") {
			
			return null;
		} else {
			List<Map<String, Object>> favCertList = userService.getUserFavCert(userId);

			return favCertList;
		}
	}
	
	@GetMapping("/getAlerts")
	public Map<String, Object> getAlerts(@AuthenticationPrincipal String userId) throws ParseException {
		if (userId == "anonymousUser") {
			return null;
		} else {
			List<Map<String, Object>> favCertList = userService.getUserFavCert(userId);
			List<Map<String, Object>> alertList = new ArrayList<>();
			Map<String, Object> resultMap = new HashMap<String, Object>();
			
			// 일정이 오늘 ~ 오늘 + 7 까지의 favCert 구하기
			
			// date format
			SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
			
			// today + 7
			Calendar cal = Calendar.getInstance();
			String todayy = date.format(cal.getTime());
			Date today = date.parse(todayy);
			
			cal.add(Calendar.DATE, 8);	// +7day
			String lastdayy = date.format(cal.getTime());
			Date lastday = date.parse(lastdayy);
			
			int index = 0;
			for (int i = 0; i < favCertList.size(); i++) {
				// 필기시험 원서접수
				String docregstartdt = favCertList.get(i).get("docregstartdt").toString();
		        Date date1 = date.parse(docregstartdt);
		        
		        // 필기시험
				String docexamstartdt = favCertList.get(i).get("docexamstartdt").toString();
		        Date date2 = date.parse(docexamstartdt);
		        
		        // 필기시험 합격자 발표
				String docpassdt = favCertList.get(i).get("docpassdt").toString();
		        Date date3 = date.parse(docpassdt);
		        
		        // 실기시험 원서접수
				String pracregstartdt = favCertList.get(i).get("pracregstartdt").toString();
		        Date date4 = date.parse(pracregstartdt);
		        
		        // 실기시험
				String pracexamstartdt = favCertList.get(i).get("pracexamstartdt").toString();
		        Date date5 = date.parse(pracexamstartdt);
		        
		        // 합격자 발표
				String pracpassstartdt = favCertList.get(i).get("pracpassstartdt").toString();
		        Date date6 = date.parse(pracpassstartdt);				

				if (date1.after(today) && date1.before(lastday)) {
					long calculate = date1.getTime() - today.getTime();
					int Ddays = (int) (Math.floor(TimeUnit.HOURS.convert(calculate, TimeUnit.MILLISECONDS) / 24f));

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", index++);
					map.put("certName", favCertList.get(i).get("certName"));
					map.put("cat", "필기시험 원서접수");
					map.put("dDay", Ddays);
					map.put("open", "true");

					alertList.add(map);
				} else if (date2.after(today) && date2.before(lastday)) {
					System.out.println(date2);
					long calculate = date2.getTime() - today.getTime();
					int Ddays = (int) (Math.floor(TimeUnit.HOURS.convert(calculate, TimeUnit.MILLISECONDS) / 24f));

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", index++);
					map.put("certName", favCertList.get(i).get("certName"));
					map.put("cat", "필기시험");
					map.put("dDay", Ddays);
					map.put("open", "true");

					alertList.add(map);
				} else if (date3.after(today) && date3.before(lastday)) {
					long calculate = date3.getTime() - today.getTime();
					int Ddays = (int) (Math.floor(TimeUnit.HOURS.convert(calculate, TimeUnit.MILLISECONDS) / 24f));

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", index++);
					map.put("certName", favCertList.get(i).get("certName"));
					map.put("cat", "필기시험 합격자 발표");
					map.put("dDay", Ddays);
					map.put("open", "true");

					alertList.add(map);
				} else if (date4.after(today) && date4.before(lastday)) {
					long calculate = date4.getTime() - today.getTime();
					int Ddays = (int) (Math.ceil(calculate / (60 * 1000 * 60 * 24)));
					
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", index++);
					map.put("certName", favCertList.get(i).get("certName"));
					map.put("cat", "실기시험 원서접수");
					map.put("dDay", Ddays);
					map.put("open", "true");

					alertList.add(map);
				} else if (date5.after(today) && date5.before(lastday)) {
					long calculate = date5.getTime() - today.getTime();
					int Ddays = (int) (Math.floor(TimeUnit.HOURS.convert(calculate, TimeUnit.MILLISECONDS) / 24f));

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", index++);
					map.put("certName", favCertList.get(i).get("certName"));
					map.put("cat", "실기시험");
					map.put("dDay", Ddays);
					map.put("open", "true");

					alertList.add(map);
				} else if (date6.after(today) && date6.before(lastday)) {
					long calculate = date6.getTime() - today.getTime();
					int Ddays = (int) (Math.floor(TimeUnit.HOURS.convert(calculate, TimeUnit.MILLISECONDS) / 24f));

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", index++);
					map.put("certName", favCertList.get(i).get("certName"));
					map.put("cat", "실기시험 합격자 발표");
					map.put("dDay", Ddays);
					map.put("open", "true");

					alertList.add(map);
				}

			}
			
			resultMap.put("favCertList", favCertList);
			resultMap.put("alertList", alertList);
			
			return resultMap;
		}
	}
}
