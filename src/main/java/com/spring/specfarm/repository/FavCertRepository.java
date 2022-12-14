package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.FavCert;
import com.spring.specfarm.entity.FavCertId;

public interface FavCertRepository extends JpaRepository<FavCert, FavCertId> {
	List<FavCert> findAllByUserId(String userId);
}
