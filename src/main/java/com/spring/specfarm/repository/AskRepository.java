package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Ask;

public interface AskRepository extends JpaRepository<Ask, Integer> {

}
