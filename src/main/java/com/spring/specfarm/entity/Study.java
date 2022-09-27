package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Entity
@Table (name="T_STUDY")
@SequenceGenerator(name = "T_STUDY_SEQ_GENERATOR", sequenceName = "T_STUDY_SEQ", initialValue = 1, allocationSize = 1)
@Data
public class Study {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_STUDY_SEQ_GENERATOR")
	private int studyIdx;
	
	private String studyTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String studyContent;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	private String studyRegDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
	
	private int studyMemberCnt = 0;
	
	private int studyMaxMember;
	
	private String studyTel;
	
	private String studyYn = "Y";
	
	@Column(columnDefinition = "varchar(200)")
	private String studyImgName;
	
	@ColumnDefault("0")
	private int studyCount;
}
