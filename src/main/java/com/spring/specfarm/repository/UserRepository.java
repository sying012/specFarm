package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	User findByUserTel(String userTel);
	
	User findByUserNameContainingAndUserTel(String userName, String userTel);
	
	User findByUserIdContainingAndUserNameContainingAndAndUserTel(String userId, String userName, String userTel);

	User findByUserEmail(String userEmail);
}
