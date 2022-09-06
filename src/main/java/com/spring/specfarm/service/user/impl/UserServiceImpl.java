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
	public User join(User user) {
		return userRepository.save(user);
	}

	@Override
	public User login(String userId, String userPw) {
		User loginUser = userRepository.findByUserId(userId);

		if (loginUser != null && passwordEncoder.matches(userPw, loginUser.getUserPw())) {
			return loginUser;
		}

		return null;
	}
}
