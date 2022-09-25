package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Help;

public interface HelpRepository extends JpaRepository<Help, Integer> {
	List<Help> findByUserIdOrderByHelpRegDateDesc(String userId);
}
