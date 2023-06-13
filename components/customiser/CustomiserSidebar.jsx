"use client"
import React from 'react'
import { BsTrash, BsImages, BsChatSquareTextFill } from "react-icons/bs";
import { Flex, ColorInput, SimpleGrid } from "@mantine/core";
import CustomiseSelected from "@/components/customiser/CustomiseSelected";
import MainAction from '@/components/customiser/MainAction';
import CompleteButton from '@/components/customiser/CompleteButton';


export default function CustomiserSidebar({
  selectedElement,
  setElements,
  elements,
  backgroundColor,
  setBackgroundColor,
  setSelectedElement,
  selectShape,
  stageRef
}) {

  const colourPalette = [
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
  ];

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
   * Reset the canvas to its initial state.
   */
  const resetCanvas = () => {
    setElements([]);
    setBackgroundColor("#FFF");
  };

  return (
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
        <SimpleGrid cols={3} gap={16}>
          <MainAction icon={BsImages} color="indigo" onClick={addImage}>
            Add Image
          </MainAction>
          <MainAction
            icon={BsChatSquareTextFill}
            color="indigo"
            onClick={addText}
          >
            Add Text
          </MainAction>
          {/* <MainAction icon={BsSave} color="indigo" onClick={exportCanvas}>
            Export
          </MainAction> */}
          <MainAction icon={BsTrash} color="red" onClick={resetCanvas}>
            Reset
          </MainAction>
        </SimpleGrid>
        <ColorInput
          placeholder="Pick a color"
          label="Background Colour"
          format="hex"
          swatchesPerRow={5}
          swatches={colourPalette}
          value={backgroundColor}
          onChange={(colour) => setBackgroundColor(colour)}
        />
        <CompleteButton getImage={() => stageRef.current.toDataURL({ pixelRatio: 3 })} />
      </Flex>
      {selectedElement && (
        <CustomiseSelected
          colourPalette={colourPalette}
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
  )
}
