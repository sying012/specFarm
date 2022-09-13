package com.spring.specfarm.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.Data;

@Entity
@Data
@Table(name="T_SHARE_RE_REPLY")
@IdClass(ShareReReplyId.class)
public class ShareReReply {
	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumns({
		@JoinColumn(name = "SHARE_IDX", referencedColumnName = "shareIdx"),
		@JoinColumn(name = "SHARE_REPLY_IDX", referencedColumnName = "shareReplyIdx")
	})
	private ShareReply shareReply;
	
	@Id
	private int shareReReplyIdx;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(columnDefinition = "varchar(1000)")
	private String shareReReplyContent;
	
	private String shareReReplyRegDate = LocalDateTime.now().toString();
	
}
