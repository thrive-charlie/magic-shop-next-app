"use client";

import React, { useRef, useState } from "react";
import { Flex } from "@mantine/core";
import { Stage, Layer, Rect } from "react-konva";
import Element from "./Element";
import CustomiserSidebar from "./CustomiserSidebar";

export const dynamic = 'force-dynamic';

export default function ProductCustomiser() {

  // TODO: Load preset data from API
  // const data = await useApi(`/api/customiser/${props.searchParams.id}`);

  // TODO: Make sure all product data from previous page is here
  // for adding to the cart.

  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedId, selectShape] = useState(null);
  const [elements, setElements] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#FFF");
  const stageRef = useRef(null);
  const backgroundRef = useRef(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 1190 / 2,
    height: 1900 / 2
  });

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
        <CustomiserSidebar
          selectedElement={selectedElement}
          setElements={setElements}
          elements={elements}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          setSelectedElement={setSelectedElement}
          selectShape={selectShape}
          stageRef={stageRef}
        />
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
