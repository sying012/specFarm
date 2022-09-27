package com.spring.specfarm.service.skills;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.specfarm.entity.JobCafe;

public interface JobCafeService {

	//API DB저장
	void getJobCafe(List<Map<String, Object>> list);

	//jobCafeList
	Page<JobCafe> getJobCafeList(String searchKeyword, Pageable pageable);

	

	
}
