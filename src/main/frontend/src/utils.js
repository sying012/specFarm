import React, { useState, useEffect } from "react";

export const useBeforeRender = (callback, deps) => {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
    callback();
    setIsRun(true);
  }

  useEffect(() => () => setIsRun(false), deps);
};

const utils = () => {
  return <div></div>;
};

export default utils;
