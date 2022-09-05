package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table(name="T_FAV_CERT")
@Entity
@Data
public class FavCert {
	@Id
	private String userId;
	@Id
	private int certIdx;
	
	private int favCertIdx;
}
