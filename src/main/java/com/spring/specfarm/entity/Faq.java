package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Faq {
	@Id
	private int faqIdx;
	
	private String faqTitle;
	
	private String faqContent;
}
