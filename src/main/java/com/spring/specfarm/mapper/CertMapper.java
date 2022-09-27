package com.spring.specfarm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CertMapper {
	 List<Map<String, Object>> getCertLList();
	 
	 List<Map<String, Object>> getCertMList(String obligfldnm);
	 
	 List<Map<String, Object>> getCertSList(String mdobligfldnm);
	 
	 List<Map<String, Object>> getTestList(String jmcd);
	 
	 List<Map<String, Object>> getCertList();
	 
	 List<Map<String, Object>> getCertSearch(String searchKeyword);
	 
	 List<Map<String, Object>> getContentList();
	 
	 Map<String, Object> getHeartState(String cert_idx);
	 
	 int setHeart(@Param("cert_idx")String cert_idx,@Param("userId") String userId);
	 
	 int putHeart(@Param("cert_idx")String cert_idx,@Param("userId") String userId);
	 
	 String getCertIdx(String cert_idx);
	 
}
