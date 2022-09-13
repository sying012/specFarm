package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class ShareFileId implements Serializable {
	
	private int share;
	
	private int shareFileIdx;
	
}
