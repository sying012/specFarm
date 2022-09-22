package com.spring.specfarm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CertMapper {
	 List<Map<String, Object>> getCertLList();
	 
	 List<Map<String, Object>> getCertMList(String obligfldnm);
	 
	 List<Map<String, Object>> getCertSList(String mdobligfldnm);
}
