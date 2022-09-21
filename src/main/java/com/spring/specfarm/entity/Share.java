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
import javax.persistence.Transient;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import lombok.Data;

@Entity
@Data
@Table(name="T_SHARE")
@SequenceGenerator(name = "T_SHARE_SEQ_GENERATOR", sequenceName = "T_SHARE_SEQ", initialValue = 1, allocationSize = 1)
@DynamicInsert
public class Share {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_SHARE_SEQ_GENERATOR")
	private int shareIdx;
	
	private String shareTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String shareContent;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	private String shareRegDate =  LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
	
	private String shareYn = "Y";
	
	@ColumnDefault("'shareImg.png'")
	private String shareImgName;	
	
	@Transient
	private int countReply;
}
