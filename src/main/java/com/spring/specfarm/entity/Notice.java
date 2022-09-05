package com.spring.specfarm.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_NOTICE")
public class Notice {
	@Id
	private int noticeIdx;
	
	private String noticeTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String noticeContent;
	
	private String noticeRegDate = LocalDateTime.now().toString();
}
