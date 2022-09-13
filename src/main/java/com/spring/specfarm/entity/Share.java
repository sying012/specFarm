package com.spring.specfarm.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_SHARE")
public class Share {
	@Id
	private int shareIdx;
	
	private String shareTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String shareContent;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="USER_ID")
	private User user;
	
	private String shareRegDate =  LocalDateTime.now().toString();
	
	private boolean shareYn;
	
	private String shareImgName;	
}
