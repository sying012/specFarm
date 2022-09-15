package com.spring.specfarm.service.community;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;

public interface ShareService {
	
	int insertShare(Share share);

	User getUser(String userId);

}
