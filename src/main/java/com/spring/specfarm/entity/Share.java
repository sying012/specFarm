package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_SHARE")
public class Share {
	@Id
	private int shareIdx;
	private String shareTitle;
	private String shareContent;
	private String userId;
	private String shareRegDate;
	private boolean shareYn;
	private String shareImgName;	
}
