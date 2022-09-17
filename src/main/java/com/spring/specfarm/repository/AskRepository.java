package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Ask;
import com.spring.specfarm.entity.User;

public interface AskRepository extends JpaRepository<Ask, Integer> {
	List<Ask> findAllByUserOrderByAskRegDateDesc(User user);
}
