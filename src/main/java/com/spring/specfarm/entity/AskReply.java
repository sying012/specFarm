package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Entity
@Data
@Table(name="T_ASK_REPLY")
@IdClass(AskReplyId.class)
public class AskReply {
	@Id
	@Column(name="ASK_REPLY_IDX")
	private int askReplyIdx;
	
	@Id
	@Column(name="ASK_IDX")
	private int askIdx;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(columnDefinition = "varchar(1000)")
	private String askReplyContent;
	
	private String askReplyRegDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
	
	
	@Column(columnDefinition = "char(1)")
	private char askReplyYn = 'Y';
	
}
