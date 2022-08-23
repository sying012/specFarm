package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.AskReReply;
import com.spring.specfarm.entity.AskReReplyId;

public interface AskReReplyRepository extends JpaRepository<AskReReply, AskReReplyId> {

}
