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
	
	@Column(name="implplannm")
	private String implplannm;
	
	@Column(name="docregstartdt")
	private String docregstartdt;
	
	@Column(name="docregenddt")
	private String docregenddt;
	
	@Column(name="docexamstartdt")
	private String docexamstartdt;
	
	@Column(name="docpassdt")
	private String docpassdt;
	
	@Column(name="pracregstartdt")
	private String pracregstartdt;
	
	@Column(name="pracregenddt")
	private String pracregenddt;
	
	@Column(name="pracexamstartdt")
	private String pracexamstartdt;
	
	@Column(name="pracexamenddt")
	private String pracexamenddt;
	
	@Column(name="pracpassstartdt")
	private String pracpassstartdt;
	
}
