package com.spring.specfarm.service.notice;

import java.util.List;

import com.spring.specfarm.entity.Help;

public interface HelpService {
	
	List<Help> getHelpList(String userId);
	
	void insertHelp(Help help);
	
}
