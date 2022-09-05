package com.spring.specfarm.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class AskFileId implements Serializable  {
	private int ask;
	private int askFileIdx;
}
