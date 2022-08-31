import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editer = ({ placeholder, value, ...rest }) => {
  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <ReactQuill
      {...rest}
      placeholder={placeholder}
      value={value || ""}
      theme="snow"
      modules={modules}
      formats={formats}
      style={{ marginTop: "20px" }}
    ></ReactQuill>
  );
};

export default Editer;

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];
