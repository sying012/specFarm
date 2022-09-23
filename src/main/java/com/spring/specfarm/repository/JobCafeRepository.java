package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.JobCafe;

public interface JobCafeRepository extends JpaRepository<JobCafe, Integer> {

//	@Query(value="select ifnull(max(a.jobCafe_idx), 0) + 1 from t_jobCafe a", nativeQuery=true)
//	int getNextJobCafeIdx();
//
//	void getJobCafe(List<Map<String, Object>> list);
//
//	void save(List<Map<String, Object>> list);

}
