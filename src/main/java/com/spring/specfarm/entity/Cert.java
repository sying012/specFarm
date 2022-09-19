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
	
	@Column(name="obligfldcd")
	private String obligfldcd;
	
	@Column(name="seriescd")
	private String seriescd;
	
	@Column(name="jmcd")
	private String jmcd;
	
	@Column(name="mdobligfldnm")
	private String mdobligfldnm;
	
	@Column(name="seriesnm")
	private String seriesnm;
	
	@Column(name="mdobligfldcd")
	private String mdobligfldcd;
	
	@Column(name="obligfldnm")
	private String obligfldnm;
	
	@Column(name="qualgbcd")
	private String qualgbcd;
	
	@Column(name="CertName")
	private String CertName;
	
	@Column(name="qualgbnm")
	private String qualgbnm;
	
}
