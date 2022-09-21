package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {

	Page<Notice> findByNoticeTitleContaining(String searchKeyword, Pageable pageable);

	//next는 되는데 얘는 왜안되는지 모르겠음 근데 메소드 퀘리로 하니까 됨 ㅎㅎ
	//@Query(value="SELECT * FROM T_NOTICE WHERE NOTICE_TITLE LIKE '%:%searchKeyword%' AND NOTICE_IDX > :noticeIdx ORDER BY NOTICE_IDX ASC LIMIT 1", nativeQuery = true)
	//Notice getPrev(@Param("noticeIdx")int noticeIdx);
	
	Notice findTopByNoticeTitleContainingAndNoticeIdxGreaterThanOrderByNoticeIdxAsc(String searchKeyword, int noticeIdx);
	
	
	//@Query(value="SELECT * FROM T_NOTICE WHERE NOTICE_IDX < :noticeIdx ORDER BY NOTICE_IDX DESC LIMIT 1", nativeQuery = true)
	//Notice getNext(@Param("noticeIdx")int noticeIdx);
	
	//SELECT * FROM T_NOTICE WHERE NOTICE_IDX < :noticeIdx ORDER BY NOTICE_IDX DESC LIMIT 1
	//SELECT * FROM T_NOTICE WHERE NOTICE_TITLE LIKE '%:%searchKeyword%' AND NOTICE_IDX < :noticeIdx ORDER BY NOTICE_IDX DESC LIMIT 1
	Notice findTopByNoticeTitleContainingAndNoticeIdxLessThanOrderByNoticeIdxDesc(String searchKeyword,int noticeIdx);
	
}
