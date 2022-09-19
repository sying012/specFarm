package com.spring.specfarm.social.helper;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

import com.spring.specfarm.social.SocialLoginType;

@Configuration
public class SocialTypeConverter implements Converter<String, SocialLoginType> {
	@Override
	public SocialLoginType convert(String s) {
		return SocialLoginType.valueOf(s.toUpperCase());
	}

}
