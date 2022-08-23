package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {

}
