package com.spring.specfarm.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_ASK")
public class Ask {
	@Id
	private int askIdx;
	
	private String askTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String askContent;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="USER_ID")
	private User user;
	
	private String askRegDate =  LocalDateTime.now().toString();
	
	@Column(columnDefinition = "varchar(100)")
	private String askCert;
}
