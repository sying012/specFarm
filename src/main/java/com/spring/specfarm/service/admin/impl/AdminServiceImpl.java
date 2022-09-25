package com.spring.specfarm.service.admin.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.AskRepository;
import com.spring.specfarm.repository.ShareRepository;
import com.spring.specfarm.repository.StudyRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.admin.AdminService;

@Service
public class AdminServiceImpl implements AdminService{
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	StudyRepository studyRepository;
	
	@Autowired
	AskRepository askRepository;
	
	@Autowired
	ShareRepository shareRepository;

	@Override
	public Page<User> getUserList(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	@Override
	public int getUserCount() {
		return (int)userRepository.count();
	}

	@Override
	public int getStudyTotal() {
		return (int) studyRepository.count(); // 스터디 총 게시물 개수;
	}

	@Override
	public int getAskTotal() {
		return (int) askRepository.count(); // 물어반 총 게시물 개수;
	}

	@Override
	public int getShareTotal() {
		return (int) shareRepository.count(); // 나눔 총 게시물 개수;
	}

}
