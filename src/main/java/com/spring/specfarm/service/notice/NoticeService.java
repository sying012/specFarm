package com.spring.specfarm.service.notice;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Brch;
import com.spring.specfarm.entity.Lost;
import com.spring.specfarm.entity.Notice;

public interface NoticeService {

	void saveBrchs(List<Brch> brchList);

	List<Brch> getBrchs();

	void saveLosts(List<Lost> lostList);

	List<Map<String, Object>> getLosts();

	List<Map<String, Object>> getSearchLosts(String searchType, String searchText);

	int insertNotice(Notice notice);

	Page<Notice> getNoticeList(String searchKeyword, Pageable pageable);

	Notice getNotice(int noticeId);

	Notice getNext(int noticeId);

	Notice getPrev(int noticeId);

}
