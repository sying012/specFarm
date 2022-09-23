package com.spring.specfarm.service.community;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.AskReReply;
import com.spring.specfarm.entity.AskReply;
import com.spring.specfarm.entity.User;

public interface AskService {

	int insertAsk(Ask ask);

	Page<Ask> getAskList(String searchType, String searchKeyword, Pageable pageable);

	List<AskReply> getAskReplyList(int id);

	int getAskReplyCount(int askIdx);

	List<AskReReply> getAskReReplyList(int id, int replyIdx);

	Ask getAsk(int askIdx);

	User getUser(String userId);

	int getAskReplyIdx(int askIdx);

	List<AskReply> insertAskReply(AskReply askReply);

	int getAskReReplyIdx(int askIdx, int askReplyIdx);

	List<AskReReply> insertAskReReply(AskReReply askReReply);

	void deleteAsk(int askIdx);

	int getAskReReplyCount(AskReply askReply);
}
