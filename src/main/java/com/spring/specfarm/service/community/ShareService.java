package com.spring.specfarm.service.community;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.ShareFile;
import com.spring.specfarm.entity.ShareReReply;
import com.spring.specfarm.entity.ShareReply;
import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;

public interface ShareService {
	
	User getUser(String userId);

	// share 글 등록
	int insertShare(Share share);

	// share 글 등록 시 첨부파일 리스트
	void insertShareFileList(List<ShareFile> shareFileList);

	// share 리스트
	Page<Share> getShareList(String searchKeyword, Pageable pageable);
	
	// share 상세페이지
	Share shareDetail(int shareIdx);

	// share 상세페이지 댓글 리스트
	List<ShareReply> getShareReplyList(int id);
	
	//share 댓글 count
	int getShareReplyCount(int shareIdx);
	
	// share 상세페이지 대댓글 리스트
	List<ShareReReply> getShareReReplyList(int id, int replyIdx);

	// share 댓글 Idx
	int getShareReplyIdx(int shareIdx);
	
	// share 댓글 작성 
	List<ShareReply> insertShareReply(ShareReply shareReply);
	
	// share 대댓글 Idx
	int getShareReReplyIdx(int shareIdx, int shareReplyIdx);
	
	// share 대댓글 작성
	List<ShareReReply> insertShareReReply(ShareReReply shareReReply);

	// share 글 삭제
	void deleteShare(int shareIdx);

	//share 첨부된 파일 리스트
	List<ShareFile> getfileList(int shareIdx);

	//share 대댓글 count
	int getShareReReplyCount(ShareReply shareReply);

	String shareState(Share share);

	
	
}
