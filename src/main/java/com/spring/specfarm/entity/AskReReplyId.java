package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class AskReReplyId implements Serializable {
	private AskReply askReply;
	private int askReReplyIdx;
}
