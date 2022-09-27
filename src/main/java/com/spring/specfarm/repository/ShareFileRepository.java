package com.spring.specfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.ShareFile;
import com.spring.specfarm.entity.ShareFileId;

public interface ShareFileRepository extends JpaRepository<ShareFile, ShareFileId> {
	//첨부파일 저장하는 쿼리
	@Query(value = "select ifnull(max(a.share_file_idx), 0) + 1 from t_share_file a where a.share_idx = :shareIdx", nativeQuery = true)
	int getNextFileIdx(@Param("shareIdx") int shareIdx);

	//첨부파일 반환
	List<ShareFile> findByShare(Share share);
	
//	//첨부파일 삭제
//	void deleteByShareFileIdxShareShareIdx(ShareFile shareFile);
}
