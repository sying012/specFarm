package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="T_NOICE_FILE")
@IdClass(NoticeFileId.class)
public class NoticeFile {
	@Id
	private int noticeFileIdx;
	
	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="NOTICE_IDX")
	private Notice notice;
	
	private String noticeFileName;
}
