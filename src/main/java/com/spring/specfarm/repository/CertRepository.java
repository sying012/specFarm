package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Cert;

public interface CertRepository extends JpaRepository<Cert, Integer> {

}
