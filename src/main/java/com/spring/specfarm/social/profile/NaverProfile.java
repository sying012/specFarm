package com.spring.specfarm.social.profile;

import lombok.Data;

@Data
public class NaverProfile {
	public String resultcode;
	public String message;
	public Response response;

	@Data
	public class Response { // (1)
		public String id;
		public String nickname;
		public String profile_image;
		public String email;
		public String name;
	}

}
