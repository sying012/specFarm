package com.spring.specfarm.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.spring.specfarm.entity.CertContents;

public interface CertContentsRepository extends JpaRepository<CertContents, Integer> {
	
	@Query(value="select distinct(a.jmcd) from t_cert a", nativeQuery=true)
	List<String> getJmCdList();
	
	@Query(value="select ifnull(max(a.cert_contents_idx), 0) + 1 from t_cert_contents a", nativeQuery=true)
	int getNextCertContentsIndex();
		


	
		
	
		
		
		
	
		
	

	
}