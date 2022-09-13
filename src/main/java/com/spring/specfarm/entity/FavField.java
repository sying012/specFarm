package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "T_FAV_FIELD")
@Data
public class FavField {
	@Id
	private int favFieldIdx;
	
}
