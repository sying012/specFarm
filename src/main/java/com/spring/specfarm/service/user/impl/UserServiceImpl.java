package com.spring.specfarm.service.user.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.User;
import com.spring.specfarm.mapper.FavCertMapper;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.user.UserService;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private FavCertMapper favCertMapper;
	
	// user 가져오기
	@Override
	public User getUser(String userId) {
		User user = userRepository.findById(userId).get();
		return user;
	}

	@Override
	public User idCheck(User user) {
		if (userRepository.findById(user.getUserId()).isPresent()) {
			return userRepository.findById(user.getUserId()).get();
		} else {
			return null;
		}
	}

	@Override
	public User telCheck(User user) {
		if (userRepository.findByUserTel(user.getUserTel()) != null) {
			return userRepository.findByUserTel(user.getUserTel());
		} else {
			return null;
		}
	}

	@Override
	public User join(User user) {
		return userRepository.save(user);
	}

	@Override
	public User login(String userId, String userPw) {
		if (userRepository.findById(userId).isPresent()) {
			User loginUser = userRepository.findById(userId).get();
			if (loginUser.getUserYn().equals("Y") && passwordEncoder.matches(userPw, loginUser.getUserPw())) {
				return loginUser;
			}
		}

		return null;
	}

	@Override
	public User findUser(User user) {
		User findUser;
		if (user.getUserId() == null || user.getUserId() == "") {
			findUser = userRepository.findByUserNameAndUserTel(user.getUserName(), user.getUserTel());
		} else {
			findUser = userRepository.findByUserIdAndUserNameAndUserTel(user.getUserId(),
					user.getUserName(), user.getUserTel());
		}

		if (findUser != null) {
			return findUser;
		} else {
			return null;
		}
	}

	@Override
	public void pwReset(User user) {
		User findUser = userRepository.findByUserIdAndUserNameAndUserTel(user.getUserId(),
				user.getUserName(), user.getUserTel());

		findUser.setUserPw(user.getUserPw());
		userRepository.save(findUser);
	}

	@Override
	public void certifiedPhoneNumber(String phoneNumber, String numStr) {
		String api_key = "NCSMIADEQC0PECP7";
		String api_secret = "UVDFRLBBNETU35KVPBV1YTEPVRJTQHNQ";
		Message coolsms = new Message(api_key, api_secret);

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phoneNumber); // 수신전화번호
		params.put("from", "01084393070"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
		params.put("type", "SMS");
		params.put("text", "[specFarm] 인증번호 [" + numStr + "]를 입력해주세요.");
		params.put("app_version", "test app 1.2"); // application name and version

		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}

	}

	@Override
	public List<Map<String, Object>> getUserFavCert(String userId) {
		List<Map<String, Object>> favCertList = favCertMapper.getFavCert(userId);
		
		return favCertList;
	}


}
