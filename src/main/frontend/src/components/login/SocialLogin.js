import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../app-config";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "./Oauth";

import kakao from "../../images/kakaotalk_sharing_btn_medium.png";
import naver from "../../images/btnG_icon_circle.png";
import google from "../../images/g-logo.png";

const SocialLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const pathname = new URL(window.location.href).pathname;

  useEffect(() => {
    if (code !== null) {
      console.log(code);
      console.log(pathname);
      (async () => {
        await axios({
          method: "get",
          url: API_BASE_URL + pathname,
          params: { code: code },
        }).then((response) => {
          if (response.data !== null || response.data !== "") {
            console.log(response.data);
            window.sessionStorage.setItem("ACCESS_TOKEN", response.data);
            navigate("/");
          }
        });
      })();
    }
  }, [code]);

  return (
    <>
      <div>
        <a href={NAVER_AUTH_URL}>
          <img
            src={naver}
            style={{
              width: "48px",
              height: "48px",
            }}
          ></img>
        </a>
      </div>
      <div>
        <a href={KAKAO_AUTH_URL}>
          <img
            src={kakao}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "90px",
            }}
          ></img>
        </a>
      </div>
      <div>
        <a href={GOOGLE_AUTH_URL}>
          <img
            src={google}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "90px",
            }}
          ></img>
        </a>
      </div>
    </>
  );
};

export default SocialLogin;
