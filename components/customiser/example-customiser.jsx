"use client";

import React from 'react'
import {Image as NextImage} from 'next/image';

import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import "konva/lib/shapes/Image";

const TestImage = () => {
    const [image] = useImage('/pillow/image.jpg');
    return <Image image={image} alt="some text" />;
  };

export default function ExampleCustomiser() {

    const [isDragging, setIsDragging] = React.useState(false);
    const [x, setX] = React.useState(50);
    const [y, setY] = React.useState(50);

  return (
    <div>
        <div className='border-2 m-1 p-2 bg-slate-50 relative'>
            <NextImage src="/pillow/mask.png" width={600} height={400} alt="Mask" className='absolute top-0 left-0 z-10 pointer-events-none' />
            <Stage width={600} height={400}>
                <Layer>
                <TestImage
                    x={x}
                    y={y}
                    draggable
                    onDragStart={() => setIsDragging(true) }
                    onDragEnd={(e) => {
                        setIsDragging(false);
                        setX(e.target.x());
                        setY(e.target.y());
                    }}
                />
                </Layer>
            </Stage>
        </div>
    </div>
  )
}
