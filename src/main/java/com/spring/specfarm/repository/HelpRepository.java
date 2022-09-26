package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.specfarm.entity.Help;

public interface HelpRepository extends JpaRepository<Help, Integer> {
	List<Help> findByUserIdOrderByHelpRegDateDesc(String userId);

	//@Query(value="SELECT * FROM T_HELP WHERE REPLY IS NULL", nativeQuery = true)
	Page<Help> findByReplyIsNull(Pageable pageable);

	//@Query(value="SELECT * FROM T_HELP WHERE REPLY IS NOT NULL", nativeQuery = true)
	Page<Help> findByReplyIsNotNull(Pageable pageable);
}
