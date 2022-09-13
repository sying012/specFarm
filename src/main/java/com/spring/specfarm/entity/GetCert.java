package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="T_GET_CERT")
@Data
@IdClass(GetCertId.class)
public class GetCert {
	@Id
	private int getCertIdx;
	
	@Id
	private String userId;
	
	private String certName;
	
	private String getCertDate;
}
