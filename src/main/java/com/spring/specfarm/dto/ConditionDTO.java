package com.spring.specfarm.dto;

import lombok.Data;

@Data
public class ConditionDTO {
	
	private areaItemsDTO[] areaItems;
	
	private jobItemsDTO[] jobItems;
	
	private String searchText;
	
}
