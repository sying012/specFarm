package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class AskReReplyId implements Serializable {
	private AskReplyId askReply;
	private int askReReplyIdx;
}
