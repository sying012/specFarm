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

	int getNewUserW(String weekString);

	int getNewUserM(String monthString);

	int getNewStudyCount(String dateW);

	int getNewAskCount(String dateW);

	int getNewShareCount(String dateW);

	int getNewAskReplyCount(String dateW);

	int getNewShareReplyCount(String dateW);

	int getNewAskReReplyCount(String dateW);

	int getNewShareReReplyCount(String dateW);

	int getDayNewUser(String date);
}
