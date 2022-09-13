package com.spring.specfarm.dto;

import lombok.Data;

@Data
public class LostDTO {
	private int lostIdx;
	private String brchName;
	private String lostCat;
	private String lostItem;
	private String lostLoc;
	private String lostDate;

}
