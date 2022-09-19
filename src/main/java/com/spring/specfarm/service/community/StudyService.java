package com.spring.specfarm.service.community;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;

public interface StudyService {

	User getUser(String userId);

	int insertStudy(Study study);

	Page<Study> getStudyList(Pageable pageable);

}
