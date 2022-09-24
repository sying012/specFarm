import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { API_BASE_URL } from "../app-config";

Quill.register("modules/imageResize", ImageResize);

const Editer = ({ placeholder, value, place, ...rest }) => {
  const quillRef = useRef(null);
  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];
  const [imagesList, setImagesList] = useState([]);

  const modules = {
    toolbar: {
      container: toolbarOptions,
      // handlers: {
      //   image: handleImage,
      // },
    },
  };

  useEffect(() => {
    const handleImage = () => {
      const input = document.createElement("input");
      const formData = new FormData();
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        const file = input.files;
        if (file !== null) {
          formData.append("image", file[0]);
        }

        // 현재 커서 위치 저장
        const range = quillRef.current?.getEditor().getSelection();

        // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
        quillRef.current
          ?.getEditor()
          .insertEmbed(range.index, "image", `/images/loading.gif`);

        await axios
          .post(API_BASE_URL + `/${place}/upload/images`, formData)
          .then((response) => {
            const url = `/upload/${place}/` + response.data.file;

            // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
            quillRef.current?.getEditor().deleteText(range.index, 1);
            // 받아온 url을 이미지 태그에 삽입
            quillRef.current
              ?.getEditor()
              .insertEmbed(range.index, "image", url);

            // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
            quillRef.current?.getEditor().setSelection(range.index + 1);

            setImagesList(() => {
              let list = imagesList;
              list.push(response.data.file);
              return list;
            });
          });
      };
    };
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleImage);
    }

    //컴포넌트 언마운트시 실행될 소스코드
    // useEffect(() => {
    //   return () => {

    //   }
    // }, []);
    return () => {
      if (!sessionStorage.getItem("submit")) {
        axios
          .post(API_BASE_URL + `/${place}/delete/images`, imagesList)
          .then((response) => console.log(response));
      }
      console.log("ss");
      sessionStorage.removeItem("submit");
    };
  }, []);

  return (
    <ReactQuill
      {...rest}
      ref={quillRef}
      placeholder={placeholder}
      value={value || ""}
      theme="snow"
      modules={{
        ...modules,
        imageResize: {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      }}
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
