package com.spring.specfarm.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.specfarm.entity.JobCafe;
import com.spring.specfarm.entity.Share;

public interface JobCafeRepository extends JpaRepository<JobCafe, Integer> {

	//API DB저장
	@Query(value="select ifnull(max(a.job_cafe_idx), 0) + 1 from t_job_cafe a", nativeQuery=true)
	int getNextJobCafeIdx();

	//검색
	Page<JobCafe> findByCafeNameContainingOrGuGunContaining(String searchKeyword1,String searchKeyword2, Pageable pageable);

	
}
