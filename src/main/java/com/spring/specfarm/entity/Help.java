package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Table(name="T_HELP")
@Entity
@Data
public class Help {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_HELP_SEQ_GENERATOR")
	private int helpIdx;
	
	private String category;
	
	private String helpTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String helpContent;
	
	private String attachedFile;
	
	private String userId;
	
	private String helpRegDate =  LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
	
	@ColumnDefault("null")
	private String reply;
	
}
