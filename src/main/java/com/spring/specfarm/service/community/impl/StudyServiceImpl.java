package com.spring.specfarm.service.community.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.StudyRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.community.StudyService;

@Service
public class StudyServiceImpl implements StudyService {

	@Autowired
	StudyRepository studyRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public User getUser(String userId) {
		if (userRepository.findById(userId).isEmpty()) {
			return null;
		} else {
			return userRepository.findById(userId).get();
		}
	}

	@Override
	public int insertStudy(Study study) {
		studyRepository.save(study);
		return study.getStudyIdx();
	}

	@Override
	public Page<Study> getStudyList(Pageable pageable) {
		return studyRepository.findAll(pageable);
	}

	@Override
	public Study getStudy(int studyIdx) {
		return studyRepository.findById(studyIdx);
	}

	@Override
	public Page<Study> deleteStudy(int studyIdx, Pageable pageable) {
		studyRepository.deleteById(studyIdx);
		return studyRepository.findAll(pageable);
	}
}
