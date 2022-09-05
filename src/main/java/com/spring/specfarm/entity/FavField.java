package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "T_LOST")
@Data
public class FavField {
	@Id
	private int favFieldIdx;
	
}
