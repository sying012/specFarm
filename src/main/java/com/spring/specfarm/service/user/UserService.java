package com.spring.specfarm.service.user;

import com.spring.specfarm.entity.User;

public interface UserService {
	User join(User user);
	
	User login(String userId, String userPw);
}
