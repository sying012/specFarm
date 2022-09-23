package com.spring.specfarm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JobCafeMapper {
	List<Map<String, Object>> getJobCafeList();
	
	
}
