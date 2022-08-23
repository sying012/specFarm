package com.spring.specfarm.dto;

import java.util.List;

import lombok.Data;

@Data
//다양한 객체를 리턴하기 위해서 제네릭 설정
public class ResponseDTO<T> {
	private String error;
	
	private List<T> data;
}
