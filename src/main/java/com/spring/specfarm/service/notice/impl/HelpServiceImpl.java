package com.spring.specfarm.service.notice.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Help;
import com.spring.specfarm.repository.HelpRepository;
import com.spring.specfarm.service.notice.HelpService;

@Service
public class HelpServiceImpl implements HelpService {
	
	@Autowired
	HelpRepository helpRepository;
	
	@Override
	public List<Help> getHelpList(String userId) {
		return helpRepository.findByUserIdOrderByHelpRegDateDesc(userId);
	}

	@Override
	public void insertHelp(Help help) {
		helpRepository.save(help);
	}
	
	@Override
	public void deleteHelp(int helpIdx) {
		helpRepository.deleteById(helpIdx);
	}

	@Override
	public Page<Help> getNonReplyHelpList(Pageable pageable) {
		return helpRepository.findByReplyIsNull(pageable);
	}

	@Override
	public Page<Help> getReplyHelpList(Pageable pageable) {
		return helpRepository.findByReplyIsNotNull(pageable);
	}

}
