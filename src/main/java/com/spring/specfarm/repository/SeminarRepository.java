package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Seminar;

public interface SeminarRepository extends JpaRepository<Seminar, Integer> {

}
