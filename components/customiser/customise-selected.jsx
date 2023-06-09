"use client"

import React, { forwardRef } from "react";
import {
  Button,
  Divider,
  Flex,
  TextInput,
  ColorInput,
  Select,
  Text
} from "@mantine/core";
import {
  RxDoubleArrowDown,
  RxArrowDown,
  RxArrowUp,
  RxDoubleArrowUp,
  RxTrash
} from "react-icons/rx";

export const dynamic = 'force-dynamic';
export default function CustomiseSelected({ element, deleteElement }) {
  // Font controls
  const fontUp = () => element.setFontSize(element.getFontSize() + 2);
  const fontDown = () => element.setFontSize(element.getFontSize() - 2);
  const fontLeft = () => element.setAlign("left");
  const fontCenter = () => element.setAlign("center");
  const fontRight = () => element.setAlign("right");

  // Layer controls
  const layerDown = () => element.moveDown();
  const layerUp = () => element.moveUp();
  const layerBottom = () => element.moveToBottom();
  const layerTop = () => element.moveToTop();

  // Delete
  const removeElement = () => {
    element.remove();
    deleteElement();
  };

  /**
 * Select item lifted out to own component to add
 * value attribute.
 */
const SelectItem = forwardRef(({ label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Text size="sm">{label}</Text>
  </div>
));
SelectItem.displayName = "SelectItem";

  return (
    <div>
      <Divider
        my="lg"
        size="md"
        label="Selected Element"
        labelPosition="center"
      />
      <Flex justify="center" gap="md">
        <Button variant="outline" onClick={layerBottom}>
          <RxDoubleArrowDown />
        </Button>
        <Button variant="outline" onClick={layerDown}>
          <RxArrowDown />
        </Button>
        <Button variant="outline" onClick={layerUp}>
          <RxArrowUp />
        </Button>
        <Button variant="outline" onClick={layerTop}>
          <RxDoubleArrowUp />
        </Button>
      </Flex>

      <Flex my={16} justify="center" gap="md">
        <Button
          variant="outline"
          color="red"
          leftIcon={RxTrash}
          onClick={removeElement}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          color="indigo"
          onClick={() => {
            console.log(element.zIndex(2));
          }}
        >
          See Data
        </Button>
      </Flex>

      {element?.attrs?.component === "Text" && (
        <>
          <Flex justify="center" gap="md" mb={16}>
            <Button variant="outline" onClick={fontUp}>
              Font +
            </Button>
            <Button variant="outline" onClick={fontDown}>
              Font -
            </Button>
          </Flex>
          <Flex justify="center" gap="md" mb={16}>
            <Button variant="outline" onClick={fontLeft}>
              Align Left
            </Button>
            <Button variant="outline" onClick={fontCenter}>
              Align Center
            </Button>
            <Button variant="outline" onClick={fontRight}>
              Align Right
            </Button>
          </Flex>
          <TextInput
            label="Update Text"
            my={16}
            defaultValue={element.getText()}
            onChange={(e) => element.setText(e.target.value)}
          />
          <ColorInput
            placeholder="Pick a color"
            label="Font Colour"
            my={16}
            format="hex"
            swatchesPerRow={5}
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
            defaultValue={element.getFill()}
            onChange={(colour) => element.setFill(colour)}
          />
          <Select
            label="Font"
            placeholder="Select a Font"
            my={16}
            itemComponent={SelectItem}
            data={[
              "Permanent Marker",
              "Calibri",
              "Passion One",
              "Chewy",
              "Arial"
            ]}
            defaultValue={element.getFontFamily()}
            onChange={(value) => element.setFontFamily(value)}
          />
        </>
      )}
    </div>
  );
}
