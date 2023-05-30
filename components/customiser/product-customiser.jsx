"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import ImageUpload from "./image-upload";
import { AiOutlinePlus } from "react-icons/ai";
import ContextMenu from "./context-menu";
import { useMouse } from '@mantine/hooks';

// Import the minified Konva Library
import "konva/konva.min.js";

export default function ProductCustomiser() {

  const [contextOpen , setContextOpen] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [hasInit, setHasInit] = useState(false);
  const textInput = useRef(null);
  const { ref, x, y } = useMouse();

  let stage = null;
  let transformer = null;
  var layer = null;
  let x1, y1, x2, y2;

  const selectionRectangle = new Konva.Rect({
    fill: "rgba(0,0,255,0.5)",
    padding: "10px",
    visible: true,
  });
  transformer = new Konva.Transformer();

  useEffect(() => {
    if (!hasInit) {
      initCanvas();
    }
  }, []);

  const initCanvas = () => {
    // Setup stage
    stage = new Konva.Stage({
      container: "container",
      width: 1184,
      height: 600,
    });

    // Setup layer
    layer = new Konva.Layer();
    console.log('Setting layer', layer);
    stage.add(layer);

    // Add transformer
    layer.add(transformer);

    // add a new feature, lets add ability to draw selection rectangle
    layer.add(selectionRectangle);

    // Attach events
    stage.on("mousedown touchstart", (e) => {
      // do nothing if we mousedown on any shape
      if (e.target !== stage) {
        return;
      }
      e.evt.preventDefault();
      x1 = stage.getPointerPosition().x;
      y1 = stage.getPointerPosition().y;
      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;

      selectionRectangle.visible(true);
      selectionRectangle.width(0);
      selectionRectangle.height(0);
    });
    stage.on("mousemove touchmove", (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;

      selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
    });
    stage.on("mouseup touchend", (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false);
      });

      var shapes = stage.find(".image");
      var box = selectionRectangle.getClientRect();
      var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      transformer.nodes(selected);
    });
    stage.on("click tap", function (e) {
      // if we are selecting with rect, do nothing
      if (selectionRectangle.visible()) {
        console.log("Selection in progress");
        return;
      }

      // if click on empty area - remove all selections
      if (e.target === stage) {
        console.log("Empty area clicked");
        transformer.nodes([]);
        return;
      }

      // do nothing if clicked NOT on our rectangles
      // if (!e.target.hasName('image')) {
      //   return;
      // }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = transformer.nodes().indexOf(e.target) >= 0;

      console.log("If statement");

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        transformer.nodes([e.target]);
        console.log("Single item selected", e.target);
        selectionRectangle.d;
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = transformer.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        transformer.nodes(nodes);
        console.log("Remove item", e.target);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = transformer.nodes().concat([e.target]);
        transformer.nodes(nodes);
        console.log("Adding many items", e.target);
      }
    });

    // hide menu
    window.addEventListener("click", () => {
      setContextOpen(false);
    });

    // Open menu
    stage.on("contextmenu", function (e) {
      // prevent default behavior
      e.evt.preventDefault();
      if (e.target === stage) {
        // if we are on empty place of the stage we will do nothing
        return;
      }

      setMenuPosition({ x, y });
      setCurrentShape(e.target);
      setContextOpen(true);

    });

    setHasInit(true);

  };

  const drawImage = (src) => {
    Konva.Image.fromURL(src, (img) => {
      img.setAttrs({
        x: 80,
        y: 100,
        name: "image",
        draggable: true,
        scale: { x: 0.5, y: 0.5 },
      });

      console.log(layer);
      layer.add(img);

      img.on("transform", () => {
        // reset scale on transform
        img.setAttrs({
          scaleX: 1,
          scaleY: 1,
          width: img.width() * img.scaleX(),
          height: img.height() * img.scaleY(),
        });
      });
    });
  };

  const addImage = () => {
    let src = "/custom/test.jpg";
    drawImage(src);
  };

  const exportCanvas = () => {
    var dataURL = stage.toDataURL({ pixelRatio: 3 });
    var link = document.createElement("a");
    link.download = "Export.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addText = () => {
    const complexText = new Konva.Text({
      x: 20,
      y: 60,
      text: textInput.current.value,
      fontSize: 32,
      fontFamily: "Calibri",
      fill: "#A00",
      width: 300,
      padding: 20,
      // align: 'center',
      draggable: true,
    });
    layer.add(complexText);

    complexText.on("transform", function () {
      // reset scale, so only with is changing by transformer
      complexText.setAttrs({
        width: complexText.width() * complexText.scaleX(),
        scaleX: 1,
      });
    });
    stage.add(layer);
    textInput.current.value = "";
  };

  return (
    <section className="bg-slate-100 p-4 flex relative">
      <LoadingOverlay visible={!hasInit} overlayBlur={2} />
      <div className="w-1/4 mr-12 flex flex-col gap-y-4">
        <Button onClick={addImage}>Add Image</Button>
        <ImageUpload addImage={drawImage} />
        <Button color="grape" onClick={exportCanvas}>
          Export
        </Button>
        <div className="flex items-center">
          <TextInput
            placeholder="Add text to design"
            defaultValue=""
            ref={textInput}
            className="mr-4"
          />
          <Button color="indigo" onClick={addText}>
            <AiOutlinePlus />
          </Button>
        </div>
      </div>
      <div ref={ref} id="container" className="border-2 border-gray-100 w-3/4"></div>
      <ContextMenu open={contextOpen} element={currentShape} x={menuPosition.x} y={menuPosition.y} />
    </section>
  );
}