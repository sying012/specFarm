package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "T_LOST")
@Data
@SequenceGenerator(name = "T_LOST_SEQ_GENERATOR", sequenceName = "T_LOST_SEQ", initialValue = 1, allocationSize = 1)
public class Lost {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_LOST_SEQ_GENERATOR")
	private int lostIdx;
	
	private Brch brch;
	
	private String lostCat;
	
	private String lostItem;
	
	private String lostLcc;
	
	private String lostDate;
}
