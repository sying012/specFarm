package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table (name="T_STUDY")
@Data
public class Study {
	@Id
	private int studyIdx;
	
	private String studyTitle;
	
	private String studyContent;
	
	private String userId;
	
	private String studyRegDate;
	
	private int studyMaxMember;
	
	private String studyTel;
	
	private String studyYn;
	
	private String studyImgName;
}
