package com.spring.specfarm.service.notice.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

}
