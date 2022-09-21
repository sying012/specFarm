package com.spring.specfarm.service.notice.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Brch;
import com.spring.specfarm.entity.Lost;
import com.spring.specfarm.entity.Notice;
import com.spring.specfarm.mapper.LostMapper;
import com.spring.specfarm.repository.BrchRepository;
import com.spring.specfarm.repository.LostRepository;
import com.spring.specfarm.repository.NoticeRepository;
import com.spring.specfarm.service.notice.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	BrchRepository brchRepository;
	
	@Autowired
	LostRepository lostRepository;
	
	@Autowired
	NoticeRepository noticeRepository;
	
	@Autowired
	LostMapper lostMapper;

	@Override
	public void saveBrchs(List<Brch> brchList) {
		brchRepository.saveAll(brchList);
	}

	@Override
	public List<Brch> getBrchs() {
		List<Brch> list = brchRepository.findAll();
		return list;
	}

	@Override
	public void saveLosts(List<Lost> lostList) {
		lostRepository.saveAll(lostList);
	}

	@Override
	public List<Map<String, Object>> getLosts() {
		List<Map<String, Object>> list = lostMapper.findLost();
		return list;
	}

	@Override
	public List<Map<String, Object>> getSearchLosts(String searchType, String searchText) {
		List<Map<String, Object>> lostList = new ArrayList<>();
		
		switch (searchType) {
		case "전체":
			lostList = lostMapper.findLostAll(searchText);
			break;
			
		case "지역":
			lostList = lostMapper.findLostBrchName(searchText);
			break;

	      case "분실물 목록":
	    	  lostList = lostMapper.findLostCatAndItem(searchText);
	        break;

	      case "분실 장소":
	    	  lostList = lostMapper.findLostLoc(searchText);
	        break;

	      case "분실 일자":
	        lostList = lostMapper.findLostDate(searchText);
			break;

		default:
			break;
		}

		return lostList;
	}
	
	//========================================================================================//
	
	@Override
	public int insertNotice(Notice notice) {
		noticeRepository.save(notice);
		return notice.getNoticeIdx();
	}

	@Override
	public Page<Notice> getNoticeList(String searchKeyword, Pageable pageable) {	
		return noticeRepository.findByNoticeTitleContaining(searchKeyword,pageable);
	}

	@Override
	public Notice getNotice(int noticeId) {
		return noticeRepository.findById(noticeId).get();
	}
	
	@Override
	public Notice getPrev(String searchKeyword, int noticeId) {
		return noticeRepository.findTopByNoticeTitleContainingAndNoticeIdxGreaterThanOrderByNoticeIdxAsc(searchKeyword, noticeId);
	}

	@Override
	public Notice getNext(String searchKeyword, int noticeId) {
		return noticeRepository.findTopByNoticeTitleContainingAndNoticeIdxLessThanOrderByNoticeIdxDesc(searchKeyword,noticeId);
	}

	@Override
	public void deleteNotice(String noticeIdx) {
		noticeRepository.deleteById(Integer.parseInt(noticeIdx));
		
	}

}
