package com.spring.specfarm.dto;


import lombok.Data;

@Data
public class GetCertDTO {
	
	private int getCertIdx;
	
	private String userId;
	
	private String certName;
	
	private String getCertDate;
}
