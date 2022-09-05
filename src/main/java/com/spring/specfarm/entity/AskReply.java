package com.spring.specfarm.entity;

import java.time.LocalDateTime;

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
	private int askReplyIdx;
	
	@Id
	private int askIdx;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(columnDefinition = "varchar(1000)")
	private String askReplyContent;
	
	private String askReplyRegDate = LocalDateTime.now().toString();
	
	
	@Column(columnDefinition = "char(1)")
	@ColumnDefault("'y'")
	private String askReplyYn;
	
}
