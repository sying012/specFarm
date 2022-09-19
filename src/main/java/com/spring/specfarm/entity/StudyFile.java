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
@Data
@Table(name="T_STUDY_FILE")
@IdClass(StudyFileId.class)
public class StudyFile {
	@Id
	private int studyFileIdx;
	
	@Id
	@ManyToOne
	@JoinColumn(name="STUDY_IDX")
	private Study study;
	
	@Column(columnDefinition = "varchar(1000)")
	private String originalFileName;
	
	private String fileName;
	
	private String filePath;
}
	
	
