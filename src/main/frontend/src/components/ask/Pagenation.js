import React from "react";

const Pagenation = () => {
  return (
    <div id="pagenation">
      <button type="button" className="page">
        ↑
      </button>
      <button type="button" className="page active">
        1
      </button>
      <button type="button" className="page">
        2
      </button>
      <button type="button" className="page">
        3
      </button>
      <button type="button" className="page">
        4
      </button>
      <button type="button" className="page">
        ↓
      </button>
    </div>
  );
};

export default Pagenation;
