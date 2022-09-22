package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Study;

public interface StudyRepository extends JpaRepository<Study, Integer> {
	Study findById(int studyIdx);
	
//	List<Study> findTop4ByStudyCountOrderByStudyCountDesc();
}
