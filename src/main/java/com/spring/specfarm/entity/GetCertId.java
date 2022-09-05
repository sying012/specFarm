package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class GetCertId implements Serializable {
	private int certIdx;
	private String userId;
}
