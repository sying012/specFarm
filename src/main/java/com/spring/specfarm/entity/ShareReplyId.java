package com.spring.specfarm.entity;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.Data;

@Data
public class ShareReplyId implements Serializable {
	private int shareIdx;
	private int shareReplyIdx;
}
