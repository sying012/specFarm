package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="T_SHARE_REPLY")
@Data
@IdClass(ShareReplyId.class)
public class ShareReply {
	@Id
	private int shareIdx;
	
	@Id
	private int shareReplyIdx;
}