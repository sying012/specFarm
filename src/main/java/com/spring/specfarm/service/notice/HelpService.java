package com.spring.specfarm.service.notice;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Help;
import com.spring.specfarm.entity.Share;

public interface HelpService {
	
	List<Help> getHelpList(String userId);
	
	void insertHelp(Help help);

	Page<Help> getNonReplyHelpList(Pageable pageable);
	
}
