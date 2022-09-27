package com.spring.specfarm.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.User;

@Transactional
public interface ShareRepository extends JpaRepository<Share, Integer> {
	//Mypagelist 날짜역순으로 반환
	List<Share> findAllByUserOrderByShareRegDateDesc(User user);
	
	//검색
	Page<Share> findByShareTitleContainingOrShareContentContaining(String searchKeyword1,String searchKeyword2, Pageable pageable);
	
	//Community Main 조회수 상위4개 추출
	List<Share> findTop4ByOrderByShareCountDesc();
	
	//share 상태 받아와서 업데이트
	@Modifying
	@Query(value = "update t_share a set a.share_yn = :shareYn where a.share_idx = :shareIdx", nativeQuery = true)
	int shareState(@Param("shareIdx") int shareIdx, @Param("shareYn") String shareYn);
	
	//share 상태 변경
	@Query(value = "select a.share_yn from t_share a where a.share_idx = :shareIdx", nativeQuery = true)
	String getShareYn(@Param("shareIdx") int shareIdx);

	int countByShareRegDateGreaterThan(String dateW);

}
