package com.spring.specfarm.service.community;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;

public interface ShareService {
	
	int insertShare(Share share);

	User getUser(String userId);
	
	Page<Share> getShareList(Pageable pageable);

}
