package com.spring.specfarm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LostMapper {
	List<Map<String, Object>> findLost();
	
	List<Map<String, Object>> findLostAll(String text);
	
	List<Map<String, Object>> findLostBrchName(String text);
	
	List<Map<String, Object>> findLostCatAndItem(String text);
	
	List<Map<String, Object>> findLostLoc(String text);
	
	List<Map<String, Object>> findLostDate(String text);
}
