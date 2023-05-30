import React, { useRef, useState } from "react";

import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Dropzone } from "@mantine/dropzone";
import { IoIosImages } from "react-icons/io";
import axios from 'axios';

export default function ImageUpload({ addImage }) {
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files) => {
    setUploading(true);
    const data = new FormData();
    files.map(file => data.append('files[]', file));
    const response = await axios.post('http://127.0.0.1:8000/api/image', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response);
    response.data.files.map(file => addImage(`${process.env.NEXT_PUBLIC_BACKEND_URL}${file}`));
    setUploading(false);
    close();
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    const uploadedFiles = await uploadFormFiles(files);
    setUploads([...uploads, ...uploadedFiles]);
    setUploading(false);
  };

  return (
    <>
      <Button onClick={open}>Upload Image</Button>
      <Modal opened={opened} onClose={close} size="lg" title="Image Upload">
        <Dropzone
          openRef={openRef}
          onDrop={handleUpload}
          activateOnClick={false}
          styles={{ inner: { pointerEvents: "all" } }}
          className="px-6 py-12"
          loading={uploading}
        >
          <div className="flex items-center">
            <IoIosImages className="w-12 h-12 text-gray-500 mr-4" />
            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </div>
        </Dropzone>
      </Modal>
    </>
  );
}
