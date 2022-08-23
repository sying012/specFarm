package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.ShareFile;
import com.spring.specfarm.entity.ShareFileId;

public interface ShareFileRepository extends JpaRepository<ShareFile, ShareFileId> {

}
