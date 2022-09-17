package com.spring.specfarm.dto;

import lombok.Data;

@Data
public class FavCertDTO {
	
	private String userId;
	
	private int certIdx;
	
	private int favCertIdx;
	
	private String certName;
}
