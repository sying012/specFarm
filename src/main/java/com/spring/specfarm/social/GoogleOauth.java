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
import com.spring.specfarm.social.profile.GoogleProfile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GoogleOauth implements SocialOauth {
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
		params.add("client_id", "203080299343-i6kpgm0vtu40j9cju71usnnokt4siof4.apps.googleusercontent.com");
		params.add("redirect_uri", "http://localhost:3000/oauth2/code/google");
		params.add("code", code);
		params.add("client_secret", "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");

		// HttpHeader 와 HttpBody 를 HttpEntity에 담기
		HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);

		// Http 요청 - post 방식 - response 응답 받기
		ResponseEntity<String> accessTokenResponse = restTemplate.exchange("https://oauth2.googleapis.com/token",
				HttpMethod.POST, tokenRequest, String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		OauthToken oauthToken = null;
		try {
			oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return oauthToken;
	}

	@Override
	public String saveUserAndGetToken(OauthToken oauthToken) {
		GoogleProfile profile = findProfile(oauthToken.getAccess_token(), oauthToken.getId_token());
		
		User user = new User();
		
		if (userRepository.findByUserEmail(profile.getEmail()) == null) {
			user.setUserId(profile.getSub());
			user.setUserName(profile.getName());
			user.setUserNick(profile.getSub());
			user.setUserEmail(profile.getEmail());
			user.setUserProfileName(profile.getPicture());

			userRepository.save(user);
		} else {
			System.out.println("이미가입되어있음");
		}

		return jwtTokenProvider.create(user); // (2)
	}

	// Token 이용해서 사용자정보 가져오기
	public GoogleProfile findProfile(String token, String idToken) {
		// AccessToken 이용하여 사용자 정보 응답 받기
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + token);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		HttpEntity<MultiValueMap<String, String>> ProfileRequest = new HttpEntity<>(headers);

		// Http 요청 (POST 방식) 후, response 변수에 응답을 받음
		ResponseEntity<String> ProfileResponse = restTemplate.exchange(
				"https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken, HttpMethod.POST, ProfileRequest,
				String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		GoogleProfile googleProfile = null;
		try {
			googleProfile = objectMapper.readValue(ProfileResponse.getBody(), GoogleProfile.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return googleProfile;
	}

}
