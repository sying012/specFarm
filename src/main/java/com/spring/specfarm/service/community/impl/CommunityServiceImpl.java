package com.spring.specfarm.service.community.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.Study;
import com.spring.specfarm.repository.AskRepository;
import com.spring.specfarm.repository.ShareRepository;
import com.spring.specfarm.repository.StudyRepository;
import com.spring.specfarm.service.community.CommunityService;

@Service
public class CommunityServiceImpl implements CommunityService {
	@Autowired
	StudyRepository studyRepository;
	
	@Autowired
	AskRepository askRepository;
	
	@Autowired
	ShareRepository shareRepository;
	
	@Override
	public List<Study> getStudys() {
//		return studyRepository.findTop4ByStudyCountOrderByDesc();
		return studyRepository.findAll();
	}
	
	@Override
	public List<Ask> getAsks() {
//		return askRepository.findTop4ByAskCountOrderByDesc();
		return askRepository.findAll();
	}

	@Override
	public List<Share> getShares() {
//		return shareRepository.findTop4ByShareCountOrderByDesc();
		return shareRepository.findAll();
	}

}
