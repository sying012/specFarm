package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "T_LOST")
@Data
public class Lost {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int lostIdx;
	
	@ManyToOne
	@JoinColumn(name="BRCH_NAME")
	private Brch brch;
	
//	private String BrchName;
	
	private String lostCat;
	
	private String lostItem;
	
	private String lostLoc;
	
	private String lostDate;
}
