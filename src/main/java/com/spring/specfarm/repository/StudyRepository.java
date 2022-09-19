package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Study;

public interface StudyRepository extends JpaRepository<Study, Integer> {
	Study findById(int studyIdx);
}
