package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_SHARE_REPLY")
@IdClass(ShareReplyId.class)
public class ShareReply {
	@Id
	@Column(name="SHARE_REPLY_IDX")
	private int shareReplyIdx;
	
	@Id
	@Column(name="SHARE_IDX")
	private int shareIdx;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(columnDefinition = "varchar(1000)")
	private String shareReplyContent;
	
	private String shareReplyRegDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.mm.dd HH:mm:ss"));
	
	@Column(columnDefinition = "char(1)")
	private char shareReplyYn = 'Y';
	
	
	
	
	
}