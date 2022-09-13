package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class ShareReReplyId implements Serializable {	
	private ShareReply shareReply;
	private int shareReReplyIdx;
}
