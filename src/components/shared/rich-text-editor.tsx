import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const theme = "snow";
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      //   [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "bold",
    "italic",
    "size",
    "underline",
    "strike",
    "list",
    // "indent",
    "header",
    "link",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder: "Write Description about the board...",
  });

  React.useEffect(() => {
    if (quill) {
      quill.root.innerHTML = value;
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, onChange]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};
