package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.AskReReply;
import com.spring.specfarm.entity.AskReReplyId;
import com.spring.specfarm.entity.AskReply;

public interface AskReReplyRepository extends JpaRepository<AskReReply, AskReReplyId> {
	
	List<AskReReply> findByAskReply(AskReply AakReply);

	@Query(value="SELECT IFNULL(MAX(ASK_RE_REPLY_IDX), 0) + 1 FROM T_ASK_RE_REPLY WHERE ASK_IDX = :askIdx AND ASK_REPLY_IDX = :askReplyIdx",nativeQuery=true)
	int getAskReReplyIdx(@Param("askIdx") int askIdx, @Param("askReplyIdx") int askReplyIdx);

	int countByAskReply(AskReply askReply);

	int countByAskReReplyRegDateGreaterThan(String dateW);
}
