package com.spring.specfarm.entity;

import javax.persistence.Column;
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
	
	@Column(name="obligfldcd") //대분류 코드
	private String obligfldcd;
	
	@Column(name="obligfldnm") //대분류 이름
	private String obligfldnm;
	
	@Column(name="mdobligfldcd") //중분류 코드
	private String mdobligfldcd;
	
	@Column(name="mdobligfldnm") //중분류 이름
	private String mdobligfldnm;
		
	@Column(name="jmcd") //종목코드
	private String jmcd;
	
	@Column(name="jmfldnm") //종목 이름
	private String jmfldnm;
	
	

	
	}
	
	

