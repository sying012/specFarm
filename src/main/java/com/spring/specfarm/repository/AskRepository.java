package com.spring.specfarm.repository;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.User;

public interface AskRepository extends JpaRepository<Ask, Integer> {


	Page<Ask> findByAskCertContaining(String searchKeyword, Pageable pageable);

	Page<Ask> findByAskTitleContaining(String searchKeyword, Pageable pageable);

	Page<Ask> findByAskContentContaining(String searchKeyword, Pageable pageable);

	Page<Ask> findByAskTitleContainingOrAskContentContaining(String searchKeyword1,String searchKeyword2, Pageable pageable);

	List<Ask> findAllByUserOrderByAskRegDateDesc(User user);
	
	//Community Main 조회수 상위4개 추출
	List<Ask> findTop4ByOrderByAskCountDesc();

}
