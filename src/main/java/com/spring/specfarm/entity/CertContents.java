package com.spring.specfarm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table(name="T_CERT_CONTENTS")
@Entity
@Data
public class CertContents {
	@Id
	private int certContentsIdx;
	
	@Column(name="contents", columnDefinition = "varchar(4000)") //시험 정보
	private String contents;

	
}