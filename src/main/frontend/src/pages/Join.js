import React from "react";
import JoinPage from "../components/join/JoinPage";
import { useBeforeRender } from "../utils";

const Join = () => {
  useBeforeRender(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }, []);

  return <JoinPage />;
};

export default Join;
