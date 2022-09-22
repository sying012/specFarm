package com.spring.specfarm.service.user;

import java.util.List;

import com.spring.specfarm.dto.FavCertDTO;
import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Cert;
import com.spring.specfarm.entity.GetCert;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;

public interface MypageService {
	User getUser(String userId);
	
	User nickCheck(String userNick);
	
	void editUserMdf(User user);
	
	List<GetCert> getEarnedCert(String userId);
	
	List<Ask> getWrittenAsks(User user);
	
	List<Share> getWrittenShares(User user);
	
	List<FavCertDTO> getFavCerts(String userId);
	
	Cert getCertName(int certIdx);
	
	void resetEarnedCert(String userId);
	
	void editUserGetCert(List<GetCert> earnedCert);
	
	void deleteFavCert(String certIdx, String userId);
	
	boolean pwCheck(String userId, String pastPw);
	
}
