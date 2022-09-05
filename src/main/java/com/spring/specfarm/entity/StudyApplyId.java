package com.spring.specfarm.entity;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.Data;

@Data
public class StudyApplyId implements Serializable{

	private int studyIdx;
	
	private String userId;
}
