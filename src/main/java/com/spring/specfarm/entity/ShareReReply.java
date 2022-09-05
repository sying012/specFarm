package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_SHARE_RE_REPLY")
@IdClass(ShareReReplyId.class)
public class ShareReReply {
	@Id
	private int shareReplyIdx;
	@Id
	private int shareReReplyIdx;
	@Id
	private int shareIdx;
}
