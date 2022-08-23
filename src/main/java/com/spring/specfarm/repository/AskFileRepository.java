package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.AskFile;
import com.spring.specfarm.entity.AskFileId;

public interface AskFileRepository extends JpaRepository<AskFile, AskFileId> {

}
