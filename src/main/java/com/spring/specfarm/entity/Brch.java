package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Brch {
	@Id
	private String brchName;
	
	private String brchTrthName;
	
	private String brchTel;
	
	private String brchAddr;
}
