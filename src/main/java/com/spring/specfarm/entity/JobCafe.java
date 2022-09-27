package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="T_JOB_CAFE")
@SequenceGenerator(name = "T_JOB_CAFE_SEQ_GENERATOR", sequenceName = "T_JOB_CAFE_SEQ", initialValue = 1, allocationSize = 1)
@NoArgsConstructor
@AllArgsConstructor
public class JobCafe {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_JOB_CAFE_SEQ_GENERATOR")
	private int jobCafeIdx;
	private String cafeName;
	private String smplIntro;
	@Column(columnDefinition = "TEXT(65534)")
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
	private String rsrvSggst1;
	private String rsrvSggst2;
	private String rsrvSggst3;
	private String rsrvSggst4;
	private String rsrvSggst5;
	private String rsrvSggst6;
	private String rsrvSggst7;
	private String rsrvSggst8;
	private String rsrvSggst9;
	private String rsrvSggst10;
	private String bassAdresCn;
	private String guGun;
	private String roadAdresCn;
	private String fileName;
	private String cafeTypeName;
	
}
