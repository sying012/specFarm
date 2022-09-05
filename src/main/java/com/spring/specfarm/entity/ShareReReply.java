package com.spring.specfarm.entity;

import javax.persistence.Entity;

import lombok.Data;

@Entity
@Data
public class ShareReReply {

	private int shareReplyIdx;
	private String userId;
}
