package com.spring.specfarm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FavCertMapper {

//	List<Map<String, Object>> getFavCert(String userId);
	
	// user 정보가 없음
	// 필기 원서 접수
	List<Map<String, Object>> getCertDocreg();
	
	// 실기 원서 접수
	List<Map<String, Object>> getCertPracreg();
	
	// 필기
	List<Map<String, Object>> getCertDocexam();
	
	// 실기
	List<Map<String, Object>> getCertPracexam();
	
	// user 정보가 있음
	// 필기 원서 접수
	List<Map<String, Object>> getFavCertDocreg(String userId);
	
	// 실기 원서 접수
	List<Map<String, Object>> getFavCertPracreg(String userId);
	
	// 필기
	List<Map<String, Object>> getFavCertDocexam(String userId);
	
	// 실기
	List<Map<String, Object>> getFavCertPracexam(String userId);
	
	// 알람
	// 필기 원서 접수
	List<Map<String, Object>> getFavCertDocregDday(String userId);

	// 필기
	List<Map<String, Object>> getFavCertDocexamDday(String userId);
	
	// 필기 합격자 발표
	List<Map<String, Object>> getFavCertDocpassDday(String userId);

	// 실기 원서 접수
	List<Map<String, Object>> getFavCertPracregDday(String userId);

	// 실기
	List<Map<String, Object>> getFavCertPracexamDday(String userId);

	// 실기 합격자 발표
	List<Map<String, Object>> getFavCertPracpassDday(String userId);

}
