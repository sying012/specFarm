package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_JOB_CAFE")
public class JobCafe {
	@Id
	private String cafeName;
	private String smplIntro;
	private String spaceInfo;
	private String useDate;
	private String holiDate;
	private String facltInfo01;
	private String facltInfo02;
	private String facltInfo03;
	private String facltInfo04;
	private String facltInfo05;
	private String facltInfo06;
	private String facltInfo07;
	private String facltInfo08;
	private String facltInfo09;
	private String facltInfo10;
	private String rsrvSggst01;
	private String rsrvSggst02;
	private String rsrvSggst03;
	private String rsrvSggst04;
	private String rsrvSggst05;
	private String rsrvSggst06;
	private String rsrvSggst07;
	private String rsrvSggst08;
	private String rsrvSggst09;
	private String rsrvSggst10;
	private String bassAdresCn;
	private String guGun;
	private String roadAdresCn;
	private String fileName;
	private String cafeTypeName;
	
}
