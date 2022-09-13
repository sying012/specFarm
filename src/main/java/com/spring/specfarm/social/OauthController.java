package com.spring.specfarm.social;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2/code")
public class OauthController {
	@Autowired
	OauthService oauthService;
	
	@GetMapping("/{socialLoginType}")
	public String socialLogin(@RequestParam("code") String code,
			@PathVariable("socialLoginType") SocialLoginType socialLoginType) {		
		String token = oauthService.socialLogin(code, socialLoginType);
		
		return token;

	}
}
