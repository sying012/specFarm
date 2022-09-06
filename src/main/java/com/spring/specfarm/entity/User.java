package com.spring.specfarm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import lombok.Data;

@Entity
@Table(name = "T_USER")
@Data
@DynamicInsert
public class User {
	@Id
	private String userId;
	
	@Column(nullable = false)
	private String userPw;
	
	@Column(nullable = false)
	private String userName;
	
	@Column(nullable = false)
	private String userTel;
	
	private String userEmail;
	
	private String userNick;
	
//	@ManyToOne
//	@JoinColumn(name="FAV_FIELD_IDX")
//	private FavField favField;
	
	private String favFieldL;
	
	private String favFieldM;
	
	private String userProfileName;
	
	@Column(columnDefinition = "char(1)")
	@ColumnDefault("'Y'")
	private String userYn;
	
	
	@ColumnDefault("'ROLE_USER'")
	private String role;
}
