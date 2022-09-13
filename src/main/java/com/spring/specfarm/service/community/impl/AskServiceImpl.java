package com.spring.specfarm.service.community.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.AskReReply;
import com.spring.specfarm.entity.AskReply;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.AskReReplyRepository;
import com.spring.specfarm.repository.AskReplyRepository;
import com.spring.specfarm.repository.AskRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.community.AskService;

@Service
public class AskServiceImpl implements AskService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AskRepository askRepository;
	
	@Autowired
	AskReplyRepository askReplyRepository;
	
	@Autowired
	AskReReplyRepository askReReplyRepository;

	@Override
	public int insertAsk(Ask ask) {
		askRepository.save(ask);
		return ask.getAskIdx();
		
	}

	@Override
	public Page<Ask> getAskList(Pageable pageable) {
		return askRepository.findAll(pageable);
	}

	@Override
	public List<AskReply> getAskReplyList(int id) {

		return askReplyRepository.findByAskIdx(id);
	}

	@Override
	public int getAskReplyCount(int askIdx) {
		return (int)askReplyRepository.countByAskIdx(askIdx);
	}

	@Override
	public List<AskReReply> getAskReReplyList(int id, int replyIdx) {
		AskReply askReply = new AskReply();
		askReply.setAskIdx(id);
		askReply.setAskReplyIdx(replyIdx);
		return  askReReplyRepository.findByAskReply(askReply);
	}

	@Override
	public Ask getAsk(int askIdx) {
		
		return askRepository.findById(askIdx).get();
	}

	@Override
	public User getUser(String userId) {
		if(userRepository.findById(userId).isEmpty()) {
			return null;
		}else {
		return userRepository.findById(userId).get();}
	}

	@Override
	public int getAskReplyIdx(int askIdx) {
		
		return askReplyRepository.getAskReplyIdx(askIdx);
	}

	@Override
	public List<AskReply> insertAskReply(AskReply askReply) {
		askReplyRepository.save(askReply);
		return askReplyRepository.findByAskIdx(askReply.getAskIdx());
	}

	@Override
	public int getAskReReplyIdx(int askIdx, int askReplyIdx) {
		return askReReplyRepository.getAskReplyIdx(askIdx, askReplyIdx);
	}

	@Override
	public List<AskReReply> insertAskReReply(AskReReply askReReply) {
		System.out.println(-1);
		askReReplyRepository.save(askReReply);
		System.out.println(0);
		AskReply askReply = new AskReply();
		System.out.println(1);
		askReply.setAskIdx(askReReply.getAskReply().getAskIdx());
		System.out.println(2);
		askReply.setAskReplyIdx(askReReply.getAskReply().getAskReplyIdx());
		System.out.println(3);
		
		return askReReplyRepository.findByAskReply(askReply);
	}

}
