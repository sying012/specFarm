package com.spring.specfarm.service.notice.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Brch;
import com.spring.specfarm.entity.Lost;
import com.spring.specfarm.repository.BrchRepository;
import com.spring.specfarm.repository.LostRepository;
import com.spring.specfarm.service.notice.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	BrchRepository brchRepository;
	
	@Autowired
	LostRepository lostRepository;

	@Override
	public void saveBrch(List<Brch> brchList) {
		brchRepository.saveAll(brchList);
	}

	@Override
	public List<Brch> getBrch() {
		List<Brch> list = brchRepository.findAll();
		return list;
	}

	@Override
	public void saveLosts(List<Lost> lostList) {
		lostRepository.saveAll(lostList);
	}

	@Override
	public List<Lost> getLosts() {
		List<Lost> list = lostRepository.findAll(Sort.by(Sort.Direction.DESC, "lostDate"));;
		return list;
	}

}
