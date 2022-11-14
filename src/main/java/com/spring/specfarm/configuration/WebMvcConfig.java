package com.spring.specfarm.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	//API 요청 타임아웃 시간 3600초로 설정
	private final long MAX_AGE_SECS = 3600;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		//모든 요청에 대한 예외 등록
		registry.addMapping("/**")
				//예외로 등록될 요청 주소
				.allowedOrigins("http://localhost:3000","http://15.164.164.7","http://15.164.164.7:3000")
				//허용될 요청 방식 등록
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				//허용될 요청 헤더
				.allowedHeaders("*")
				//인증에 관한 정보 허용
				.allowCredentials(true)
				//타임아웃 시간 설정
				.maxAge(MAX_AGE_SECS);
	}
}
