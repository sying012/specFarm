package com.spring.specfarm.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;


import lombok.Data;

@Entity
@Data
@IdClass(ShareReplyId.class)
public class ShareReply {
	@Id
	private int shareReplyIdx;
	
	@Id
	private int shareIdx;
	
	private String shareReplyContent;
	
	private String shareReplyRegDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.mm.dd HH:mm:ss"));
	
	
	private char shareReplyYn = 'Y';
	
	
	
	
	
}