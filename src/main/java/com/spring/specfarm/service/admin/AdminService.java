package com.spring.specfarm.service.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.User;

public interface AdminService {

	Page<User> getUserList(Pageable pageable);

	int getUserCount();

	int getStudyTotal();

	int getAskTotal();

	int getShareTotal();

}
