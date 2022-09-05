package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table(name="T_CERT")
@Entity
@Data
public class Cert {
	@Id
	private int certIdx;
	
	private String certName;
	
	private String certLCat;
	
	private String certMCat;
	
}
