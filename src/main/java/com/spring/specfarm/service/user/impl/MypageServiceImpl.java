package com.spring.specfarm.service.user.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.GetCert;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.GetCertRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.user.MypageService;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	GetCertRepository getCertRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User getUser(String userId) {
		User loginedUser = userRepository.findByUserId(userId);
		return loginedUser;
	}

	@Override
	public void editUserMdf(User user) {
		userRepository.save(user);
	}

	@Override
	public List<GetCert> getEarnedCert(String userId) {
		System.out.println("22222222222222");
		List<GetCert> earnedCert = getCertRepository.findAllByUserId(userId);
		return earnedCert;
	}
	
	@Override
	public void resetEarnedCert(String userId) {
		System.out.println("444444444444444" + userId);
		getCertRepository.deleteAllByUserId(userId);
	}

	@Override
	public void editUserGetCert(List<GetCert> earnedCert) {
		getCertRepository.saveAll(earnedCert);
	}

	@Override
	public boolean pwCheck(String userId, String pastPw) {
		User loginUser = userRepository.findByUserId(userId);
		if(passwordEncoder.matches(pastPw, loginUser.getUserPw())) {
			return true;
		} else {
			System.out.println("something wrong");
			return false;
		}
	}

}
