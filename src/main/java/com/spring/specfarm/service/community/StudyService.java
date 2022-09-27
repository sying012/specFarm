package com.spring.specfarm.service.community;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.StudyApply;
import com.spring.specfarm.entity.User;

public interface StudyService {

	User getUser(String userId);

	int insertStudy(Study study);

	Page<Study> getStudyList(String searchKeyword, Pageable pageable);
	
	Study getStudy(int studyIdx);

	Page<Study> deleteStudy(int studyIdx, Pageable pageable);

	List<StudyApply> insertStudyMember(StudyApply studyApply);

	List<StudyApply> getStudyMemberList(int studyIdx);

	List<StudyApply> cancelJoin(int studyIdx, String userId);
	
	int getStudyApplyIdx(int studyIdx);

	StudyApply getStudyApply(int studyIdx, String userId);

	

}
