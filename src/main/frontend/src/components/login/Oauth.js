const KAKAO_API_KEY = "6cbb61f81008dbbc781f8ca6fb7eec7b";
const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth2/code/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const GOOGLE_CLIENT_ID =
  "203080299343-i6kpgm0vtu40j9cju71usnnokt4siof4.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth2/code/google";

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`;

const NAVER_CLIENT_ID = "g2OUugNFh7SaI9LqGCoh";
const NAVER_CALLBACK_URL = "http://localhost:3000/oauth2/code/naver";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=`;
