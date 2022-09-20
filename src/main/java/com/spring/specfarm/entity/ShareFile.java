package com.spring.specfarm.entity;

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
@Table(name="T_SHARE_FILE")
@IdClass(ShareFileId.class)
public class ShareFile {
	@Id
	private int shareFileIdx;
	
	@Id
	@ManyToOne
	@JoinColumn(name="SHARE_IDX")
	private Share share;
	
	@Column(columnDefinition = "varchar(1000)")
	private String shareFileName;
	
	private String originalFileName;
}
