package com.spring.specfarm.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.specfarm.entity.JobCafe;

public interface JobCafeRepository extends JpaRepository<JobCafe, Integer> {

//	@Query(value="select ifnull(max(a.job_cafe_idx), 0) + 1 from t_job_cafe a", nativeQuery=true)
//	int getNextJobCafeIdx();

	
}
