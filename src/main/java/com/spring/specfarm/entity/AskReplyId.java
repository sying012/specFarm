package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class AskReplyId implements Serializable {
	private int askReplyIdx;
	private int askIdx;
}
