package com.spring.specfarm.service.user;

import java.util.List;
import java.util.Map;

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

	List<Map<String, Object>> getCertRegList();

	List<Map<String, Object>> getCertExamList();

	List<Map<String, Object>> getFavCertRegList(String userId);

	List<Map<String, Object>> getFavCertExamList(String userId);

	List<Map<String, Object>> getFavCertAlert(String userId);
}
