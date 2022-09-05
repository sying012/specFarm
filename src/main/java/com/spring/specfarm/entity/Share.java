package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
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
