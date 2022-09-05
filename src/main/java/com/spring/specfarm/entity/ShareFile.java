package com.spring.specfarm.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
	private int shareIdx;
}
