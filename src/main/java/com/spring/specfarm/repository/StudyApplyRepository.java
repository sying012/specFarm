package com.spring.specfarm.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.StudyApply;
import com.spring.specfarm.entity.StudyApplyId;

@Transactional
public interface StudyApplyRepository extends JpaRepository<StudyApply, StudyApplyId> {
	List<StudyApply> findByStudyIdx (int studyIdx, Sort sort);
	
	@Query(value="SELECT IFNULL(MAX(STUDY_APPLY_IDX), 0) + 1 FROM T_STUDY_APPLY WHERE STUDY_IDX = :studyIdx", nativeQuery=true)
	int getStudyApplyIdx(@Param("studyIdx") int studyIdx);

	void deleteByStudyIdx(int studyIdx);
	
}
