package com.spring.specfarm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Entity
@Table(name = "T_USER")
@Data
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
	
	private FavField favfield;
	
	private String userProfileName;
	
	private String userYn;
	
	
	@ColumnDefault("'ROLE_USER'")
	private String role;
}
