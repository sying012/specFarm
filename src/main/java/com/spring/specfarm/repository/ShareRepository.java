package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;

public interface ShareRepository extends JpaRepository<Share, Integer> {
	//Mypagelist 날짜역순으로 반환
	List<Share> findAllByUserOrderByShareRegDateDesc(User user);
	
	//검색
	Page<Share> findByShareTitleContainingOrShareContentContaining(String searchKeyword1,String searchKeyword2, Pageable pageable);
	
//	List<Share> findTop4ByShareCountOrderByShareCountDesc();
}
