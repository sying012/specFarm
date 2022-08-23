package com.spring.specfarm.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

import com.spring.specfarm.jwt.JwtAuthenticationFilter;

@Configuration
//security의 filterchain을 구현하기 위해 선언
@EnableWebSecurity
public class SecurityConfig{
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	//비밀번호 암호화 인코더 추가
	//Oauth2UserService가 passwordEncoder를 바로 호출하여 사용하기 때문에
	//static 선언
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors() //cors는 WebMvcConfig로 설정했으므로 따로 지정안함
			.and()
			.csrf().disable() //csrf방식 disable
			.httpBasic().disable() //jwt를 사용하므로 basic 인증방식 disable
			//토큰 방식을 사용하므로 세션방식을 사용하지 않도록 설정
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests().antMatchers("/", "/api/member/**").permitAll()
								.anyRequest().authenticated();
		
		//filter 등록
		//매 요청마다 corsfilter 실행 후 jwtAuthenticationFilter 실행
		http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);
		
		return http.build();
	}
}
