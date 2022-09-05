package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table (name="T_STUDY_APPLY")
@Data
@IdClass(StudyApplyId.class)
public class StudyApply {
	@Id
	private int studyIdx;
	
	@Id
	private String userId;
	
	private boolean acceptYn;
	
}
