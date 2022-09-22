package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	User findByUserTel(String userTel);
	
	User findByUserNameAndUserTel(String userName, String userTel);
	
	User findByUserIdAndUserNameAndUserTel(String userId, String userName, String userTel);

	User findByUserEmail(String userEmail);
	
	User findByUserNick(String userNick);
}
