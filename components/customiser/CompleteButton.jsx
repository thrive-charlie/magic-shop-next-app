import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { IoBagAddOutline } from 'react-icons/io5';
import axios from 'axios';

import Button from '@/components/common/button';

export default function Complete({ getImage }) {

    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);

    // Get data from Local Storage using ID in query string
    const itemKey = new URLSearchParams(window.location.search).get("id");
    const { id, addons, quantity } = JSON.parse(localStorage.getItem(itemKey));

    /**
      * Export the canvas as a PNG.
      * TODO: Deselect all layers before export.
      */
    const handleAddToCart = async () => {
        setLoading(true);
        const dataURL = getImage();
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customiser/submit`,
            { id, addons, quantity, image: dataURL },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.access_token}`,
                }
            }
        );
        console.log(res);
        // TODO: Check response is ok, then go to next page
    };

    return (
        <Button
            as="button"
            icon={IoBagAddOutline}
            loading={loading}
            onClick={handleAddToCart}>
            Add to Cart
        </Button>
    )
}
