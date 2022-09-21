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
//	@Id
//	@Column(name="STUDY_APPLY_IDX")
//	private int studyApplyIdx;
	
	@Id
	@Column(name="STUDY_IDX")
	private int studyIdx;
	
	@Id
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	// 0: 미가입, 1: 가입, 2: 가입대기
	private int acceptYn = 0;
	
}
