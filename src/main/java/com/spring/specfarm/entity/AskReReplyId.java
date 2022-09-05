package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class AskReReplyId implements Serializable {
	private int ask;
	private int askReply;
	private int askReReplyIdx;
}
