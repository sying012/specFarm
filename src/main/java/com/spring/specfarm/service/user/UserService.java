package com.spring.specfarm.service.user;

import com.spring.specfarm.entity.User;

public interface UserService {
	User idCheck(User user);
	
	User telCheck(User user);
	
	User join(User user);
	
	User login(String userId, String userPw);

	User findUser(User user);

	void pwReset(User user);

	void certifiedPhoneNumber(String phoneNumber, String numStr);


}
