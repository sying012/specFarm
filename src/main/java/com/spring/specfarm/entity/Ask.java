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

import lombok.Data;

@Entity
@Data
@Table(name="T_ASK")
@SequenceGenerator(name = "T_ASK_SEQ_GENERATOR", sequenceName = "T_ASK_SEQ", initialValue = 1, allocationSize = 1)
public class Ask {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "T_ASK_SEQ_GENERATOR")
	private int askIdx;
	
	private String askTitle;
	
	@Column(columnDefinition = "varchar(10000)")
	private String askContent;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	private String askRegDate =  LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
	
	@Column(columnDefinition = "varchar(100)")
	private String askCert;
	
	@ColumnDefault("0")
	private int askCount;
	
	@Transient
	private int countReply;
}
