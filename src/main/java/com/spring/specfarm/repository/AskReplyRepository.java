package com.spring.specfarm.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.AskReply;
import com.spring.specfarm.entity.AskReplyId;


public interface AskReplyRepository extends JpaRepository<AskReply, AskReplyId> {

	List<AskReply> findByAskIdx(int askIdx);

	long countByAskIdx(int askIdx);

	@Query(value="SELECT IFNULL(MAX(ASK_REPLY_IDX), 0) + 1 FROM T_ASK_REPLY WHERE ASK_IDX = :askIdx",nativeQuery=true)
	int getAskReplyIdx(@Param("askIdx")int askIdx);

	void deleteByAskIdx(int askIdx);
}
