package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.AskReply;
import com.spring.specfarm.entity.AskReplyId;

public interface AskReplyRepository extends JpaRepository<AskReply, AskReplyId> {

}
