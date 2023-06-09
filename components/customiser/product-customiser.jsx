"use client";

import React, { useRef, useState } from "react";
import { Button, Flex, ColorInput } from "@mantine/core";
import { Stage, Layer, Rect } from "react-konva";
import {
  BsTrash,
  BsImages,
  BsChatSquareTextFill,
  BsSave
} from "react-icons/bs";
import CustomiseSelected from "./customise-selected";
import Element from "./element";
import { useApi } from "@/utils/useApi";
import { useSession } from "next-auth/react"

export const dynamic = 'force-dynamic';
export default function ProductCustomiser() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedId, selectShape] = useState(null);
  const [elements, setElements] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#FAAC0A");
  const stageRef = useRef(null);
  const backgroundRef = useRef(null);
  const { data: session, status } = useSession()

  const [canvasSize, setCanvasSize] = useState({
    width: 1190 / 2,
    height: 1900 / 2
  });

  /**
   * Add an image to the canvas.
   */
  const addImage = () => {
    setElements([
      ...elements,
      {
        component: "Image",
        x: 80,
        y: 100,
        draggable: true,
        scale: { x: 0.5, y: 0.5 },
        id: `image-${Math.random(0, 100)}`,
        image:
          "https://images.unsplash.com/photo-1685509169424-c3ec59122617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      }
    ]);
  };

  /**
   * Add text to the canvas.
   */
  const addText = () => {
    setElements([
      ...elements,
      {
        component: "Text",
        x: 20,
        y: 60,
        text: "This is some example text",
        fontSize: 32,
        fontFamily: "Permanent Marker",
        fill: "#A00",
        width: 300,
        padding: 20,
        draggable: true,
        id: `text-${Math.random(0, 100)}`
      }
    ]);
  };

  /**
   * Export the canvas as a PNG.
   * TODO: Deselect all layers before export.
   */
  const exportCanvas = async () => {
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customiser/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ data: dataURL }),
      }
    );
    // TODO: Check response is ok, then go to next page
  };

  /**
   * Reset the canvas to its initial state.
   */
  const resetCanvas = () => {
    setElements([]);
    setBackgroundColor("#FFF");
  };

  /**
   * Check if canvas element should be de-selected.
   * @param {*} e
   */
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty || e.target === backgroundRef.current) {
      setSelectedElement(null);
      selectShape(null);
    }
  };

  return (
    <section style={{ height: "100%", padding: "1rem" }}>
      <Flex>
        <aside
          style={{
            width: "35%",
            maxWidth: "25rem",
            marginRight: "1rem",
            padding: "1rem",
            backgroundColor: "#eee"
          }}
        >
          <Flex direction="column" gap={16}>
            <Button leftIcon={<BsImages />} color="indigo" onClick={addImage}>
              Add Image
            </Button>
            <Button
              leftIcon={<BsChatSquareTextFill />}
              color="indigo"
              onClick={addText}
            >
              Add Text
            </Button>
            <Button leftIcon={<BsSave />} color="indigo" onClick={exportCanvas}>
              Export
            </Button>
            <Button leftIcon={<BsTrash />} color="red" onClick={resetCanvas}>
              Reset
            </Button>
            <ColorInput
              placeholder="Pick a color"
              label="Background Colour"
              format="hex"
              swatches={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14"
              ]}
              value={backgroundColor}
              onChange={(colour) => setBackgroundColor(colour)}
            />
          </Flex>
          {selectedElement && (
            <CustomiseSelected
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              element={selectedElement}
              deleteElement={() => {
                setSelectedElement(null);
                selectShape(null);
              }}
            />
          )}
        </aside>
        <main
          style={{
            width: `${canvasSize.width + 4}px`,
            height: `${canvasSize.height + 4}px`,
            border: "2px dashed #333",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: "none"
            }}
          >
            <img
              src="https://sandbox.thrv.uk/tea-towel-mockup.webp"
              alt="mockup"
            />
          </div>
          <Stage
            width={canvasSize.width}
            height={canvasSize.height}
            backgroundColor="#A00"
            ref={stageRef}
            onContextMenu={(e) => console.log("opened menu of ", e.target)}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              <Rect
                width={canvasSize.width}
                height={canvasSize.height}
                x={0}
                y={0}
                fill={backgroundColor}
                style={{ pointerEvents: "none" }}
                ref={backgroundRef}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
              />
            </Layer>
            <Layer>
              {elements.map((element, index) => (
                <Element
                  key={index}
                  shapeProps={element}
                  isSelected={element.id === selectedId}
                  onSelect={(e) => {
                    setSelectedElement(e.target);
                    selectShape(element.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = elements.slice();
                    rects[index] = newAttrs;
                    setElements(rects);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </main>
      </Flex>
    </section>
  );
}
