package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.SeminarFile;
import com.spring.specfarm.entity.SeminarFileId;

public interface SeminarFileRepository extends JpaRepository<SeminarFile, SeminarFileId> {

}
