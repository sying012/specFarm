package com.spring.specfarm.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.spring.specfarm.entity.CertTest;

public interface CertTestRepository extends JpaRepository<CertTest, Integer> {
	
	@Query(value="select distinct a.jmcd from t_cert a where a.jmcd not in (select distinct b.jmcd from t_cert_test b)", nativeQuery=true)
	List<String> getJmcdList();
	
	@Query(value="select ifnull(max(a.cert_test_idx), 0) + 1 from t_cert_test a", nativeQuery=true)
	int getNextCertTestIndex();
	



	




}
