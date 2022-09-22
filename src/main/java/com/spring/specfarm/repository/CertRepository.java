package com.spring.specfarm.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.specfarm.entity.Cert;

public interface CertRepository extends JpaRepository<Cert, Integer> {
	

	@Query(value="select ifnull(max(a.cert_idx), 0) + 1 from t_cert a", nativeQuery=true)
	int getNextCertIndex();
}
