package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;

public interface ShareRepository extends JpaRepository<Share, Integer> {
	List<Share> findAllByUserOrderByShareRegDateDesc(User user);
}
