package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_ASK_RE_REPLY")
@IdClass(AskReReplyId.class)
public class AskReReply {
	@Id
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumns({
		@JoinColumn(name = "ASK_IDX", referencedColumnName = "ASK_IDX"),
		@JoinColumn(name = "ASK_REPLY_IDX", referencedColumnName = "ASK_REPLY_IDX")
	})
	private AskReply askReply;
	
	@Id
	private int askReReplyIdx;

	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(columnDefinition = "varchar(1000)")
	private String askReReplyContent;
	
	private String askReReplyRegDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
	
	@Column(columnDefinition = "char(1)")
	private char askReReplyYn = 'y';
}
