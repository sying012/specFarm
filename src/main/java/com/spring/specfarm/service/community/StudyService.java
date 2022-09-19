package com.spring.specfarm.service.community;

import java.util.List;

import com.spring.specfarm.entity.Study;
import com.spring.specfarm.entity.User;

public interface StudyService {

	User getUser(String userId);

	int insertStudy(Study study);

}
