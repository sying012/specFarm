package com.spring.specfarm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table (name="T_STUDY_APPLY")
@Data
@IdClass(StudyApplyId.class)
public class StudyApply {

	private int studyApplyIdx;
	
	@Id
	@Column(name="STUDY_IDX")
	private int studyIdx;
	
	@Id
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	private int acceptYn = 0;
	
}
