package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.specfarm.entity.GetCert;

@Transactional
public interface GetCertRepository extends JpaRepository<GetCert, Integer> {
	List<GetCert> findAllByUserId(String userId);
	
	void deleteByUserId(String userId);
}
