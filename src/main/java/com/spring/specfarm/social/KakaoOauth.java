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
import com.spring.specfarm.social.profile.KakaoProfile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KakaoOauth implements SocialOauth {
	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Override
	public OauthToken getAccessToken(String code) {
		RestTemplate rt = new RestTemplate();

		// HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		// HttpBody 오브젝트 생성
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "6cbb61f81008dbbc781f8ca6fb7eec7b");
		params.add("redirect_uri", "http://localhost:3000/oauth2/code/kakao");
		params.add("code", code);
		params.add("client_secret", "3Easapl5xdnezwFpC6PEOHAEa5uGcmCi");

		// HttpHeader 와 HttpBody 를 HttpEntity에 담기
		HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);

		// Http 요청 - post 방식 - response 응답 받기
		ResponseEntity<String> accessTokenResponse = rt.exchange("https://kauth.kakao.com/oauth/token", HttpMethod.POST,
				tokenRequest, String.class);

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
		KakaoProfile profile = findProfile(oauthToken.getAccess_token());

		User user = new User();

		if (userRepository.findByUserEmail(profile.getKakao_account().getEmail()) == null) {
			user.setUserEmail(profile.getKakao_account().getEmail());
			user.setUserId(profile.getId().toString());
			user.setUserName(null);
			user.setUserNick(profile.getKakao_account().getProfile().getNickname());
			user.setUserProfileName(profile.getKakao_account().getProfile().getProfile_image_url());
			user.setUserTel(null);

			userRepository.save(user);
		}

		return jwtTokenProvider.create(user); // (2)
	}

	private KakaoProfile findProfile(String token) {
		// AccessToken 이용하여 사용자 정보 응답 받기
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + token);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		HttpEntity<MultiValueMap<String, String>> ProfileRequest = new HttpEntity<>(headers);

		// Http 요청 (POST 방식) 후, response 변수에 응답을 받음
		ResponseEntity<String> ProfileResponse = restTemplate.exchange("https://kapi.kakao.com/v2/user/me",
				HttpMethod.POST, ProfileRequest, String.class);
		System.out.println(ProfileResponse);

		ObjectMapper objectMapper = new ObjectMapper();
		KakaoProfile kakaoProfile = null;
		try {
			kakaoProfile = objectMapper.readValue(ProfileResponse.getBody(), KakaoProfile.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return kakaoProfile;
	}

}
