"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import ImageUpload from "./image-upload";
import { AiOutlinePlus } from "react-icons/ai";
import ContextMenu from "./context-menu";
import { useMouse } from "@mantine/hooks";
import CanvasEditor from "./canvas-editor";

// Import the minified Konva Library
import "konva/konva.min.js";

export default function ProductCustomiser() {
  const [contextOpen, setContextOpen] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [hasInit, setHasInit] = useState(false);
  const textInput = useRef(null);
  const { ref, x, y } = useMouse();

  const editor = useRef(new CanvasEditor({
    contextOpen, currentShape, setCurrentShape, setMenuPosition
  }));

  const initEditor = () => {
    editor.current.initCanvas();
    setHasInit(true);
  };

  useEffect(() => {
    if (!hasInit) {
      initEditor();
    }
  }, [hasInit]);

  return (
    <section className="bg-slate-100 p-4 flex relative">
      <LoadingOverlay visible={!hasInit} overlayBlur={2} />
      {hasInit && (
        <div className="w-1/4 mr-12 flex flex-col gap-y-4">
          <Button onClick={e => editor.current.addImage(e)}>Add Image</Button>
          <ImageUpload addImage={e => editor.current.drawImage(e)} />
          <Button color="grape" onClick={e => editor.current.exportCanvas(e)}>
            Export
          </Button>
          <div className="flex items-center">
            <TextInput
              placeholder="Add text to design"
              defaultValue=""
              ref={textInput}
              className="mr-4"
            />
            <Button color="indigo" onClick={e => {
                editor.current.addText(textInput.current.value);
                textInput.current.value = "";
              }}>
              <AiOutlinePlus />
            </Button>
          </div>
          <ContextMenu
            open={contextOpen}
            element={currentShape}
            x={menuPosition.x}
            y={menuPosition.y}
          />
        </div>
      )}
      <div
        ref={ref}
        id="container"
        className="border-2 border-gray-100 w-3/4"
      ></div>
    </section>
  );
}
