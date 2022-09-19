package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class StudyFileId implements Serializable  {
	private int study;
	private int studyFileIdx;
}
