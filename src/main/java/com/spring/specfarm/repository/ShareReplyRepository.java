package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.ShareReply;
import com.spring.specfarm.entity.ShareReplyId;

public interface ShareReplyRepository extends JpaRepository<ShareReply, ShareReplyId> {

}
