package com.spring.specfarm.service.community.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.AskReReply;
import com.spring.specfarm.entity.AskReply;
import com.spring.specfarm.entity.AskReplyId;
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
	public Page<Ask> getAskList(String searchType, String searchKeyword, Pageable pageable) {
		if (searchKeyword == null || searchKeyword.equals("")) {
			return askRepository.findAll(pageable);
		} else {
			if (searchType.equals("자격증")) {
				return askRepository.findByAskCertContaining(searchKeyword, pageable);
			} else if (searchType.equals("제목")) {
				return askRepository.findByAskTitleContaining(searchKeyword, pageable);
			} else if (searchType.equals("내용")) {
				return askRepository.findByAskContentContaining(searchKeyword, pageable);
			} else if (searchType.equals("제목+내용")) {
				return askRepository.findByAskTitleContainingOrAskContentContaining(searchKeyword, searchKeyword,
						pageable);
			} else {
				return null;
			}

		}
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
		return askReReplyRepository.getAskReReplyIdx(askIdx, askReplyIdx);
	}

	@Override
	public List<AskReReply> insertAskReReply(AskReReply askReReply) {
System.out.println("aaaa");
		askReReplyRepository.save(askReReply);
		System.out.println("bbbb");
		AskReply askReply = new AskReply();

		askReply.setAskIdx(askReReply.getAskReply().getAskIdx());

		askReply.setAskReplyIdx(askReReply.getAskReply().getAskReplyIdx());
		List<AskReReply> list =askReReplyRepository.findByAskReply(askReply);
		System.out.println("ccc");
		return list;
	}

	@Override
	public void deleteAsk(int askIdx) {
		askRepository.deleteById(askIdx);
		askReplyRepository.deleteByAskIdx(askIdx);
	}

	@Override
	public int getAskReReplyCount(AskReply askReply) {
		
		return askReReplyRepository.countByAskReply(askReply);
	}

}
