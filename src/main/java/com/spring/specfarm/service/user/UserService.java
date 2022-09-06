package com.spring.specfarm.service.user;

import com.spring.specfarm.entity.User;

public interface UserService {
	User idCheck(User user);
	
	User join(User user);
	
	User login(String userId, String userPw);
}
