package com.spring.specfarm.social;

public interface SocialOauth {
	//리액트에서 보낸 code로 accessToken 발급 
	OauthToken getAccessToken(String code);

	//사용자 정보 DB 저장 후 토큰 발급
	String saveUserAndGetToken(OauthToken oauthToken);

	default SocialLoginType type() {
		if (this instanceof GoogleOauth) {
			return SocialLoginType.google;
		} else if (this instanceof NaverOauth) {
			return SocialLoginType.naver;
		} else if (this instanceof KakaoOauth) {
			return SocialLoginType.kakao;
		} else {
			return null;
		}
	}
}
