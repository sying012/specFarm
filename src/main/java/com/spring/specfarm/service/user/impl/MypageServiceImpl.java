package com.spring.specfarm.service.user.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.specfarm.dto.FavCertDTO;
import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Cert;
import com.spring.specfarm.entity.FavCert;
import com.spring.specfarm.entity.FavCertId;
import com.spring.specfarm.entity.GetCert;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.AskRepository;
import com.spring.specfarm.repository.CertRepository;
import com.spring.specfarm.repository.FavCertRepository;
import com.spring.specfarm.repository.GetCertRepository;
import com.spring.specfarm.repository.ShareRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.user.MypageService;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	GetCertRepository getCertRepository;
	
	@Autowired
	AskRepository askRepository;
	
	@Autowired
	ShareRepository shareRepository;
	
	@Autowired
	FavCertRepository favCertRepository;
	
	@Autowired
	CertRepository certRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User getUser(String userId) {
		User loginedUser = userRepository.findById(userId).get();
		return loginedUser;
	}
	
	@Override
	public User nickCheck(String userNick) {
		if (userRepository.findByUserNick(userNick) != null) {
			return userRepository.findByUserNick(userNick);
		} else {
			return null;
		}
	}

	@Override
	public void editUserMdf(User user) {
		userRepository.save(user);
	}

	@Override
	public List<GetCert> getEarnedCert(String userId) {
		List<GetCert> earnedCert = getCertRepository.findAllByUserIdOrderByGetCertDate(userId);
		return earnedCert;
	}
	
	@Override
	public List<Ask> getWrittenAsks(User user) {
		List<Ask> writtenAsks = askRepository.findAllByUserOrderByAskRegDateDesc(user);
		return writtenAsks;
	}
	
	@Override
	public List<Share> getWrittenShares(User user) {
		List<Share> writtenShares = shareRepository.findAllByUserOrderByShareRegDateDesc(user);
		return writtenShares;
	}
	
	@Override
	public List<FavCertDTO> getFavCerts(String userId) {
		List<FavCert> favCerts = favCertRepository.findAllByUserId(userId);
		List<FavCertDTO> favCertDTOsList = new ArrayList<>();
		for(FavCert favCert : favCerts) {
			FavCertDTO favCertDTO = new FavCertDTO();
			favCertDTO.setCertIdx(favCert.getCertIdx());
			favCertDTO.setUserId(favCert.getUserId());
			favCertDTO.setFavCertIdx(favCert.getFavCertIdx());
			favCertDTO.setCertName(getCertName(favCert.getCertIdx()).getJmfldnm());
			
			favCertDTOsList.add(favCertDTO);
		}
		return favCertDTOsList;
	}
	
	@Override
	public Cert getCertName(int certIdx) {
		if(certRepository.findById(certIdx).isPresent()) {
			return certRepository.findById(certIdx).get();
		} else { 
			return null;
		}
	}
	
	@Override
	public void resetEarnedCert(String userId) {
		getCertRepository.deleteByUserId(userId);
	}

	@Override
	public void editUserGetCert(List<GetCert> earnedCert) {
		getCertRepository.saveAll(earnedCert);
	}
	
	@Override
	public void deleteFavCert(String certIdx, String userId) {
		FavCertId favCertId = new FavCertId();
		favCertId.setCertIdx(Integer.parseInt(certIdx));
		favCertId.setUserId(userId);
		favCertRepository.deleteById(favCertId);
	}

	@Override
	public boolean pwCheck(String userId, String pastPw) {
		User loginUser = userRepository.findById(userId).get();
		if(passwordEncoder.matches(pastPw, loginUser.getUserPw())) {
			return true;
		} else {
			return false;
		}
	}

}
