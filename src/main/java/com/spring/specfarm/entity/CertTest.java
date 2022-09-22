package com.spring.specfarm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table(name="T_CERT_TEST")
@Entity
@Data
public class CertTest {
	@Id
	private int certTestIdx;
	
	@Column(name="implplannm") //회차
	private String implplannm;
	
	@Column(name="jmfldnm") // 종목이름
	private String jmfldnm;
	
	@Column(name="docregstartdt") //필기원서 접수 시작
	private String docregstartdt;
	
	@Column(name="docregenddt") //필기원서 접수 종료
	private String docregenddt;
	
	@Column(name="docexamstartdt") //필기시험
	private String docexamstartdt;
	
	@Column(name="docpassdt") //필기합격 발표
	private String docpassdt;
	
	@Column(name="pracregstartdt") //실기원서 접수 시작
	private String pracregstartdt;
	
	@Column(name="pracregenddt") //실기원서 접수 종료
	private String pracregenddt;
	
	@Column(name="pracexamstartdt") //실기시험 시작
	private String pracexamstartdt;
	
	@Column(name="pracexamenddt") //실기시험 종료
	private String pracexamenddt;
	
	@Column(name="pracpassstartdt") //합격자 발표
	private String pracpassstartdt;
	
}
