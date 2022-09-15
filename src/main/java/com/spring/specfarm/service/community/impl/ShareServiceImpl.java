package com.spring.specfarm.service.community.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.ShareRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.community.ShareService;

@Service
public class ShareServiceImpl implements ShareService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ShareRepository shareRepository;

	@Override
	public int insertShare(Share share) {
		shareRepository.save(share);
		return share.getShareIdx();
	}

	@Override
	public User getUser(String userId) {
		if(userRepository.findById(userId).isEmpty()) {
			return null;			
		} else {
			return userRepository.findById(userId).get();}
		}
	}


