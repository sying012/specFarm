package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.ShareReReply;
import com.spring.specfarm.entity.ShareReReplyId;
import com.spring.specfarm.entity.ShareReply;

public interface ShareReReplyRepository extends JpaRepository<ShareReReply, ShareReReplyId> {

	List<ShareReReply> findByShareReply(ShareReply shareReply);

	@Query(value="SELECT IFNULL(MAX(SHARE_RE_REPLY_IDX), 0) + 1 FROM T_SHARE_RE_REPLY WHERE SHARE_IDX = :shareIdx AND SHARE_REPLY_IDX = :shareReplyIdx", nativeQuery=true)
	int getShareReplyIdx(@Param("shareIdx") int shareIdx, @Param("shareReplyIdx") int shareReplyIdx);

}
