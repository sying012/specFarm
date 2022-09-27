package com.spring.specfarm.service.community.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.StudyApply;
import com.spring.specfarm.entity.StudyApplyId;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.StudyApplyRepository;
import com.spring.specfarm.repository.StudyRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.community.StudyService;

@Service
public class StudyServiceImpl implements StudyService {

	@Autowired
	StudyRepository studyRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	StudyApplyRepository studyApplyRepository;

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
	public Page<Study> getStudyList(String searchKeyword, Pageable pageable) {
		return studyRepository.findByStudyTitleContainingOrStudyContentContaining(searchKeyword, searchKeyword, pageable);
	}

	@Override
	public Study getStudy(int studyIdx) {
		return studyRepository.findById(studyIdx);
	}

	@Override
	public Page<Study> deleteStudy(int studyIdx, Pageable pageable) {
		studyApplyRepository.deleteByStudyIdx(studyIdx);
		studyRepository.deleteById(studyIdx);
		return studyRepository.findAll(pageable);
	}

	@Override
	public List<StudyApply> insertStudyMember(StudyApply studyApply) {
		studyApplyRepository.save(studyApply);
		return studyApplyRepository.findByStudyIdx(studyApply.getStudyIdx(),
				Sort.by(Sort.Direction.ASC, "studyApplyIdx"));
	}

	@Override
	public List<StudyApply> getStudyMemberList(int studyIdx) {

		return studyApplyRepository.findByStudyIdx(studyIdx, Sort.by(Sort.Direction.ASC, "studyApplyIdx"));
	}

	@Override
	public List<StudyApply> cancelJoin(int studyIdx, String userId) {
		StudyApplyId studyApplyId = new StudyApplyId();

		studyApplyId.setStudyIdx(studyIdx);
		studyApplyId.setUser(userId);
//		System.out.println(studyApplyId);
		studyApplyRepository.deleteById(studyApplyId);

		return studyApplyRepository.findByStudyIdx(studyIdx, Sort.by(Sort.Direction.ASC, "studyApplyIdx"));
	}

	@Override
	public int getStudyApplyIdx(int studyIdx) {

		return studyApplyRepository.getStudyApplyIdx(studyIdx);
	}

	@Override
	public StudyApply getStudyApply(int studyIdx, String userId) {

		StudyApplyId studyApplyId = new StudyApplyId();

		studyApplyId.setStudyIdx(studyIdx);
		studyApplyId.setUser(userId);

		if (studyApplyRepository.findById(studyApplyId).isEmpty()) {
			return new StudyApply();
		} else {
			return studyApplyRepository.findById(studyApplyId).get();
		}

	}

}
