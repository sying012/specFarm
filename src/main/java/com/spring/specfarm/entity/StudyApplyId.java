package com.spring.specfarm.entity;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.Data;

@Data
public class StudyApplyId implements Serializable{

	private String user;
	
	private int studyIdx;
}
