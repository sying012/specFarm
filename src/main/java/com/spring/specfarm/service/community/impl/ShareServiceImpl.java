package com.spring.specfarm.service.community.impl;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.ShareFile;
import com.spring.specfarm.entity.ShareReReply;
import com.spring.specfarm.entity.ShareReply;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.repository.ShareFileRepository;
import com.spring.specfarm.repository.ShareReReplyRepository;
import com.spring.specfarm.repository.ShareReplyRepository;
import com.spring.specfarm.repository.ShareRepository;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.service.community.ShareService;

@Service
public class ShareServiceImpl implements ShareService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ShareRepository shareRepository;
	
	@Autowired
	ShareFileRepository shareFileRepository;
	
	@Autowired
	ShareReplyRepository shareReplyRepository;
	
	@Autowired
	ShareReReplyRepository shareReReplyRepository;

	@Override
	public User getUser(String userId) {
		if(userRepository.findById(userId).isEmpty()) {
			return null;			
		} else {
			return userRepository.findById(userId).get();}
		}
	
	// Insert Share
	@Override
	public int insertShare(Share share) {
		shareRepository.save(share);
	
		shareRepository.flush();
		return share.getShareIdx();
	}

	// Insert Share File
	@Override
	public void insertShareFileList(List<ShareFile> shareFileList) {
		for(ShareFile shareFile : shareFileList) {
			int shareFileIdx = shareFileRepository.getNextFileIdx(shareFile.getShare().getShareIdx());
			
			shareFile.setShareFileIdx(shareFileIdx);
			
			shareFileRepository.save(shareFile);
		}
	}

	// Share List
	@Override
	public Page<Share> getShareList(String searchKeyword, Pageable pageable) {
		if(searchKeyword != null && !searchKeyword.equals("")) {
			return shareRepository.findByShareTitleContainingOrShareContentContaining(searchKeyword, searchKeyword,pageable);
		}else {
			
			return shareRepository.findAll(pageable);
		}
	}
	
	// Share count reply
		@Override
		public int getShareReplyCount(int shareIdx) {
			return (int)shareReplyRepository.countByShareIdx(shareIdx);
		}
	

	// Share Detail
	@Override
	public Share shareDetail(int shareIdx) {
		return shareRepository.findById(shareIdx).get();
	}

	// Share Reply List
	@Override
	public List<ShareReply> getShareReplyList(int id) {
		return shareReplyRepository.findByShareIdx(id);
	}
	
	// Share ReReplyCount
		@Override
		public int getShareReReplyCount(ShareReply shareReply) {
			return 0;
		}

	// Share ReReply List
	@Override
	public List<ShareReReply> getShareReReplyList(int id, int replyIdx) {
		ShareReply shareReply = new ShareReply();
		shareReply.setShareIdx(id);
		shareReply.setShareReplyIdx(replyIdx);
		return shareReReplyRepository.findByShareReply(shareReply);
	}
	
	// Share ReplyIdx
	@Override
	public int getShareReplyIdx(int shareIdx) {
		return shareReplyRepository.getShareReplyIdx(shareIdx);
	}

	// Insert Share Reply
	@Override
	public List<ShareReply> insertShareReply(ShareReply shareReply){
		shareReplyRepository.save(shareReply);
		return shareReplyRepository.findByShareIdx(shareReply.getShareIdx());
	}

	// Share ReReplyIdx
	@Override
	public int getShareReReplyIdx(int shareIdx, int shareReplyIdx) {
		return shareReReplyRepository.getShareReplyIdx(shareIdx, shareReplyIdx);
	}

	// Insert Share ReReply
	@Override
	public List<ShareReReply> insertShareReReply(ShareReReply shareReReply) {
		
		shareReReplyRepository.save(shareReReply);
		
		ShareReply shareReply = new ShareReply();
		
		shareReply.setShareIdx(shareReReply.getShareReply().getShareIdx());

		shareReply.setShareReplyIdx(shareReReply.getShareReply().getShareReplyIdx());
		
		return shareReReplyRepository.findByShareReply(shareReply);
	}

	// DeleteShare
	@Override
	public void deleteShare(int shareIdx) {
		shareRepository.deleteById(shareIdx);
		shareReplyRepository.deleteByShareIdx(shareIdx);
		
	}

	// Share FileList
	@Override
	public List<ShareFile> getfileList(int shareIdx) {
		Share share = new Share();
		share.setShareIdx(shareIdx);
		if (shareFileRepository.findByShare(share).isEmpty()) {
			return null;
		} else {
			return shareFileRepository.findByShare(share);
		}
	}

	// Share State
	@Override
	public String shareState(Share share) {
//		System.out.println(share.toString());
//		System.out.println(share.getShareIdx());
//		System.out.println(share.getShareYn());
		
		int shareIdx = share.getShareIdx();
		String shareYn = share.getShareYn();
		
		shareRepository.shareState(shareIdx, shareYn);
		
		return shareRepository.getShareYn(shareIdx);
	}
	
	// Edit share
	@Override
	public void editFileList(List<Map<String, Object>> editFileList) {
		System.out.println("!111111111111111111111111111111");
		for(int i = 0; i < editFileList.size(); i++) {
			if(editFileList.get(i).get("status").toString().equals("D")) {
				JSONObject jsonObj = new JSONObject(editFileList.get(i).get("share").toString());
				System.out.println(jsonObj);
				int shareIdx = Integer.parseInt(jsonObj.get("shareIdx").toString());
				
				ShareFile shareFile = new ShareFile();
				Share share = new Share();
				
				share.setShareIdx(shareIdx);
				shareFile.setShareFileIdx(Integer.parseInt(editFileList.get(i).get("shareFileIdx").toString()));
				shareFile.setShare(share);
				
				shareFileRepository.delete(shareFile);
			}
		}
	}
	

	

	
	
	
}


