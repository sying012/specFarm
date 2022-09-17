package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {

	Page<Notice> findByNoticeTitleContaining(String searchKeyword, Pageable pageable);


//	@Query(value="SELECT NOTICE_IDX, NOTICE_TITLE FROM T_NOTICE WHERE NOTICE_IDX IN ((SELECT NOTICE_IDX FROM T_NOTICE WHERE NOTICE_IDX < :noticeIdx ORDER BY NOTICE_IDX DESC LIMIT 1), (SELECT NOTICE_IDX FROM T_NOTICE WHERE NOTICE_IDX > :noticeIdx ORDER BY NOTICE_IDX LIMIT 1))", nativeQuery = true)
//	List<Notice> getPrev(@Param("noticeIdx")int noticeIdx);
//	
//	@Query(value="SELECT NOTICE_IDX, NOTICE_TITLE FROM T_NOTICE WHERE NOTICE_IDX < :noticeIdx ORDER BY NOTICE_IDX DESC LIMIT 1), (SELECT NOTICE_IDX FROM T_NOTICE WHERE NOTICE_IDX > :noticeIdx ORDER BY NOTICE_IDX LIMIT 1))", nativeQuery = true)
//	List<Notice> getNext(@Param("noticeIdx")int noticeIdx);

}
