package com.spring.specfarm.service.community;

import java.util.List;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.Study;

public interface CommunityService {
	
	List<Study> getStudys();
	
	List<Ask> getAsks();
	
	List<Share> getShares();
}
