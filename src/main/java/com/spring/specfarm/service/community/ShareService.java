package com.spring.specfarm.service.community;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.ShareFile;
import com.spring.specfarm.entity.User;

public interface ShareService {
	
	User getUser(String userId);

	int insertShare(Share share);

	Page<Share> getShareList(Pageable pageable);
	
	void insertShareFileList(List<ShareFile> shareFileList);
	
	Share shareDetail(int shareIdx);
	
//	List<ShareReply> getShareReplyList(int id);
}
