package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Lost;

public interface LostRepository extends JpaRepository<Lost, Integer> {

}
