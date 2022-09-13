package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.GetCert;

public interface GetCertRepository extends JpaRepository<GetCert, Integer> {
	List<GetCert> findAllByUserId(String userId);
	
	void deleteAllByUserId(String userId);
}
