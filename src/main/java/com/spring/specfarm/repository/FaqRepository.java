package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Integer> {

}
