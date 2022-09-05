package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class ShareReReplyId implements Serializable {	
	private int shareReplyIdx;
	private int shareReReplyIdx;
	private int shareIdx;
}
