package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table(name="T_CERT_FIELD")
@Entity
@Data

public class CertField {
	@Id
	private String certLCat;
	
	private String certMCat;
}
