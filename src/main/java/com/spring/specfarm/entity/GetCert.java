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
	private int certIdx;
	
	@Id
	private String userId;
	
	private int getCertIdx;
	
	private String getCertDate;
}
