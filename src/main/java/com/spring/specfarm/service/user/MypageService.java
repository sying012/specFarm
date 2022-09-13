package com.spring.specfarm.service.user;

import java.util.List;

import com.spring.specfarm.entity.GetCert;
import com.spring.specfarm.entity.User;

public interface MypageService {
	User getUser(String userId);
	
	void editUserMdf(User user);
	
	List<GetCert> getEarnedCert(String userId);
	
	void resetEarnedCert(String userId);
	
	void editUserGetCert(List<GetCert> earnedCert);
	
	boolean pwCheck(String userId, String pastPw);
	
}
