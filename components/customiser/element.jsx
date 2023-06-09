"use client"

import React, { useRef, useEffect } from "react";
import { Transformer } from "react-konva";
import useImage from "use-image";
export const dynamic = 'force-dynamic';
export default function Element({
  shapeProps,
  isSelected,
  onSelect,
  onChange
}) {
  const elementRef = useRef();
  const trRef = useRef();
  const [image] = useImage(shapeProps.image ?? "", "anonymous");

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([elementRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const props = {
    onClick: onSelect,
    onTap: onSelect,
    ref: elementRef,
    ...shapeProps,
    image,
    draggable: true,
    onDragEnd: (e) => {
      onChange({
        ...shapeProps,
        x: e.target.x(),
        y: e.target.y()
      });
    },
    onTransformEnd: (e) => {
      // transformer is changing scale of the node
      // and NOT its width or height
      // but in the store we have only width and height
      // to match the data better we will reset scale on transform end
      const node = elementRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // we will reset it back
      node.scaleX(1);
      node.scaleY(1);
      onChange({
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        // set minimal value
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(node.height() * scaleY)
      });
    }
  };

  return (
    <>
      {React.createElement(shapeProps.component, props)}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
