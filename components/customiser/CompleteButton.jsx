"use client";

import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useSession } from "next-auth/react"
import { IoBagAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/button';
import SuccessModal from '@/components/customiser/SuccessModal';

export default function Complete({ getImage }) {

    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();


    // Get data from Local Storage using ID in query string
    const itemKey = new URLSearchParams(window.location.search).get("id");
    if (localStorage.getItem(itemKey) === null && !modalOpen) {
        router.push("/");
    }

    const item = useRef(JSON.parse(localStorage.getItem(itemKey)));

    /**
      * Export the canvas as a PNG.
      * TODO: Deselect all layers before export.
      */
    const handleAddToCart = async () => {
        setLoading(true);
        const dataURL = getImage();
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customiser/submit`,
            {
                id: item.current.id,
                addons: item.current.addons,
                quantity: item.current.quantity,
                image: dataURL
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.access_token}`,
                }
            }
        );

        // Make sure the request was successful
        if (data.success) {
            // Stop loading, show modal and clear local storage
            localStorage.removeItem(itemKey);
            setLoading(false);
            setModalOpen(true);
        }

    };

    return (
        <>
            <Button
                as="button"
                icon={IoBagAddOutline}
                loading={loading}
                onClick={handleAddToCart}>
                Add to Cart
            </Button>
            <SuccessModal open={modalOpen} />
        </>
    )
}
