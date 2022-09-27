package com.spring.specfarm.service.admin.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.AskReReplyRepository;
import com.spring.specfarm.repository.AskReplyRepository;
import com.spring.specfarm.repository.AskRepository;
import com.spring.specfarm.repository.ShareReReplyRepository;
import com.spring.specfarm.repository.ShareReplyRepository;
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
	
	@Autowired
	AskReplyRepository askReplyRepository;
	
	@Autowired
	AskReReplyRepository askReReplyRepository;
	
	@Autowired
	ShareReplyRepository shareReplyRepository;
	
	@Autowired
	ShareReReplyRepository shareReReplyRepository;	
	
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

	@Override
	public int getNewUserW(String weekString) {
		return userRepository.countByUserRegDateGreaterThan(weekString);
	}

	@Override
	public int getNewUserM(String monthString) {
		return userRepository.countByUserRegDateGreaterThan(monthString);
	}

	@Override
	public int getNewStudyCount(String dateW) {
	
		return studyRepository.countByStudyRegDateGreaterThan(dateW);
	}

	@Override
	public int getNewAskCount(String dateW) {
		return askRepository.countByAskRegDateGreaterThan(dateW);
	}

	@Override
	public int getNewShareCount(String dateW) {
		return shareRepository.countByShareRegDateGreaterThan(dateW);
	}

	@Override
	public int getNewAskReplyCount(String dateW) {
		return askReplyRepository.countByAskReplyRegDateGreaterThan(dateW);
	}

	@Override
	public int getNewShareReplyCount(String dateW) {
		return shareReplyRepository.countByShareReplyRegDateGreaterThan(dateW);
	}

	@Override
	public int getNewAskReReplyCount(String dateW) {
		return askReReplyRepository.countByAskReReplyRegDateGreaterThan(dateW);
	}

	@Override
	public int getNewShareReReplyCount(String dateW) {
		return shareReReplyRepository.countByShareReReplyRegDateGreaterThan(dateW);
	}

	@Override
	public int getDayNewUser(String date) {
		return userRepository.countByUserRegDateStartsWith(date); //해당날짜에 가입한 인원 수 반환
	}

}