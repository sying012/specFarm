package com.spring.specfarm.social;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.jwt.JwtTokenProvider;
import com.spring.specfarm.repository.UserRepository;
import com.spring.specfarm.social.profile.NaverProfile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NaverOauth implements SocialOauth {
	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Override
	public OauthToken getAccessToken(String code) {
		RestTemplate restTemplate = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpBody 오브젝트 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "g2OUugNFh7SaI9LqGCoh");
		params.add("redirect_uri", "http://localhost:3000/oauth2/code/naver");
		params.add("client_secret", "BEFtd0sUAQ");
		params.add("code", code);

		// HttpHeader 와 HttpBody 를 HttpEntity에 담기
		HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);

		// Http 요청 - post 방식 - response 응답 받기
		ResponseEntity<String> accessTokenResponse = restTemplate.exchange("https://nid.naver.com/oauth2.0/token",
				HttpMethod.POST, tokenRequest, String.class);

		// (7)
		ObjectMapper objectMapper = new ObjectMapper();
		OauthToken oauthToken = null;
		try {
			oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return oauthToken; // (8)
	}

	@Override
	public String saveUserAndGetToken(OauthToken oauthToken) {
		NaverProfile profile = findProfile(oauthToken.getAccess_token());

		User user = new User();
		if (userRepository.findByUserEmail(profile.getResponse().getEmail()) == null) {
			user.setUserEmail(profile.getResponse().getEmail());
			user.setUserId(profile.getResponse().getId());
			user.setUserName(profile.getResponse().getName());
			user.setUserNick(profile.getResponse().getNickname());
			user.setUserProfileName(profile.getResponse().getProfile_image());

			userRepository.save(user);
		}

		return jwtTokenProvider.create(user); // (2)
	}

	private NaverProfile findProfile(String token) {
		// AccessToken 이용하여 사용자 정보 응답 받기
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + token); // (1-4)

		HttpEntity<MultiValueMap<String, String>> naverProfileRequest = new HttpEntity<>(headers);

		// Http 요청 (POST 방식) 후, response 변수에 응답을 받음
		ResponseEntity<String> naverProfileResponse = restTemplate.exchange("https://openapi.naver.com/v1/nid/me",
				HttpMethod.POST, naverProfileRequest, String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		NaverProfile naverProfile = null;
		try {
			naverProfile = objectMapper.readValue(naverProfileResponse.getBody(), NaverProfile.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return naverProfile;
	}

}
