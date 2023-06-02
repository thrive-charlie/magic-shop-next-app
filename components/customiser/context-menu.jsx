import React, { useEffect, useState } from 'react'
import { Menu, Button, Text } from '@mantine/core';
import { GoSettings } from 'react-icons/go';
import { AiOutlineFontSize } from 'react-icons/ai';

export default function ContextMenu({ open, element, x, y }) {

    useEffect(() => {
        console.log(element);
    }, [open]);

    const changeFont = () => {
        element.fontFamily('Arial');
    }

    const increaseSize = () => {
        element.fontSize(element.fontSize() + 2);
    }

    const decreaseSize = () => {
        element.fontSize(element.fontSize() - 2);
    }

    const deleteElement = () => {
        element.remove();
    }

  return (
    <aside style={{ top: `${y}px`, left: `${x + 150}px`, position: 'absolute' }}>
        <Menu
            shadow="md"
            width={200}
            opened={open}
            transitionProps={{ transition: 'scale', duration: 300 }}>
            
            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<GoSettings className="w-4 h-4" />}>Settings</Menu.Item>
                <Menu.Item onClick={deleteElement}>Delete</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Appearance</Menu.Label>
                {element?.attrs.hasOwnProperty('text') && (
                    <>
                        <Menu.Item icon={<AiOutlineFontSize className="w-4 h-4" />} onClick={changeFont}>
                            Change Font
                        </Menu.Item>
                        <Menu.Item icon={<AiOutlineFontSize className="w-4 h-4" />} onClick={increaseSize}>
                            Increase Size
                        </Menu.Item>
                        <Menu.Item icon={<AiOutlineFontSize className="w-4 h-4" />} onClick={decreaseSize}>
                            Decrease Size
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    </aside>
  );
}

