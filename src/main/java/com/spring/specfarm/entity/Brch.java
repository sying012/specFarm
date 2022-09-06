package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "T_BRCH")
public class Brch {
	@Id
	private String brchName;
	
	private String brchTrthName;
	
	private String brchTel;
	
	private String brchAddr;
}
