package com.spring.specfarm.service.user;

import java.util.List;
import java.util.Map;

import com.spring.specfarm.entity.FavCert;
import com.spring.specfarm.entity.User;

public interface UserService {
	// user 가져오기
	User getUser(String userId);
	
	User idCheck(User user);
	
	User telCheck(User user);
	
	User join(User user);
	
	User login(String userId, String userPw);

	User findUser(User user);

	void pwReset(User user);

	void certifiedPhoneNumber(String phoneNumber, String numStr);

	List<Map<String, Object>> getUserFavCert(String userId);
}
