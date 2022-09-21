package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.spring.specfarm.entity.StudyApply;
import com.spring.specfarm.entity.StudyApplyId;

public interface StudyApplyRepository extends JpaRepository<StudyApply, StudyApplyId> {
	List<StudyApply> findByStudyIdx (int studyIdx);
}
