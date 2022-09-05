package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class NoticeFileId implements Serializable{
	private int noticeFileIdx;
	private int notice;
}
