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

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Entity
@Data
@Table(name="T_ASK_RE_REPLY")
@IdClass(AskReReplyId.class)
public class AskReReply {
	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumns({
		@JoinColumn(name = "ASK_IDX", referencedColumnName = "askIdx"),
		@JoinColumn(name = "ASK_REPLY_IDX", referencedColumnName = "askReplyIdx")
	})
	private AskReply askReply;
	
	@Id
	private int askReReplyIdx;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(columnDefinition = "varchar(1000)")
	private String askReReplyContent;
	
	private String askReReplyRegDate = LocalDateTime.now().toString();
	
	@Column(columnDefinition = "char(1)")
	@ColumnDefault("'y'")
	private String askReReplyYn;
}
