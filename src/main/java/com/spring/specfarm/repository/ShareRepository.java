package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Share;

public interface ShareRepository extends JpaRepository<Share, Integer> {

}
