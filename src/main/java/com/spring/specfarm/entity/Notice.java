package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_NOTICE")
@SequenceGenerator(name = "T_NOTICE_SEQ_GENERATOR", sequenceName = "T_NOTICE_SEQ", initialValue = 1, allocationSize = 1)
public class Notice {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_NOTICE_SEQ_GENERATOR")
	private int noticeIdx;
	
	private String noticeTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String noticeContent;
	
	private String noticeRegDate =  LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
}
