package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Study;

public interface StudyRepository extends JpaRepository<Study, Integer> {
	Study findById(int studyIdx);
	
	List<Study> findTop4ByOrderByStudyMemberCnt();
	
	// Community Main 조회수 상위4개 추출
//	List<Study> findTop4ByOrderByStudyCountDesc();
}
