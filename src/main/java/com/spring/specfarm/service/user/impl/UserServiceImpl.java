package com.spring.specfarm.service.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.user.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

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
			findUser = userRepository.findByUserNameContainingAndUserTel(user.getUserName(), user.getUserTel());
		} else {

			findUser = userRepository.findByUserIdContainingAndUserNameContainingAndAndUserTel(user.getUserId(),
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
		System.out.println(user.getUserTel());
		User findUser = userRepository.findByUserIdContainingAndUserNameContainingAndAndUserTel(user.getUserId(),
				user.getUserName(), user.getUserTel());

		findUser.setUserPw(user.getUserPw());
		userRepository.save(findUser);
		System.out.println(findUser);
	}

	@Override
	public void certifiedPhoneNumber(String phoneNumber, String numStr) {
//		String api_key = "NCSMIADEQC0PECP7";
//		String api_secret = "UVDFRLBBNETU35KVPBV1YTEPVRJTQHNQ";
//		Message coolsms = new Message(api_key, api_secret);
//
//		// 4 params(to, from, type, text) are mandatory. must be filled
//		HashMap<String, String> params = new HashMap<String, String>();
//		params.put("to", phoneNumber); // 수신전화번호
//		params.put("from", "발송할 번호 입력"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
//		params.put("type", "SMS");
//		params.put("text", "휴대폰인증 테스트 메시지 : 인증번호는" + "[" + numStr + "]" + "입니다.");
//		params.put("app_version", "test app 1.2"); // application name and version
//
//		try {
//			JSONObject obj = (JSONObject) coolsms.send(params);
//			System.out.println(obj.toString());
//		} catch (CoolsmsException e) {
//			System.out.println(e.getMessage());
//			System.out.println(e.getCode());
//		}

	}

}
