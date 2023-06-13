"use client";

import React, { useState, useReducer } from 'react'
import AddToCart from "@/components/cart/add-to-cart"
import AddonGroup from '@/components/products/AddonGroup';
import ProductTotal from '@/components/products/ProductTotal';
import QuantitySelector from '@/components/products/QuantitySelector';

function quantityReducer(state, action) {
    switch (action.type) {
        case 'increase':
            return state + 1;
        case 'decrease':
            if (state > 1) {
                return state - 1;
            }
            return state;
        default:
            throw new Error('Invalid action type');
    }
}

/**
 * This component handles:
 *  - Displaying the addon groups
 *  - Updating the selected addons
 *  - Passing the selected addons to the AddToCart component
 *  - Updating the price
 *  - Directing users to upload artwork 
 */
export default function AddonSelector({ id, groups }) {

    // Build up the addon group schema before creating state
    const groupSchema = groups.map((group) => ({ group_id: group.id, addons: [] }));
    const [addons, setAddons] = useState(groupSchema);
    const [quantity, dispatch] = useReducer(quantityReducer, 1);

    // Update the selected addons when an addon in a group is changed
    const groupUpdated = (groupId, selected) => {

        // Find group by groupId in addons, then update selected
        const updated = addons.map((group) => {
            if (group.group_id === groupId) {
                return { group_id: groupId, addons: selected };
            }
            return group;
        });

        setAddons(updated);

    };

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tighter mb-4">Customise your product</h2>
            {groups.map((group) => <AddonGroup key={group.id} group={group} addons={addons} groupUpdated={groupUpdated} />)}
            <div className="flex justify-between mb-4">
                <QuantitySelector
                    quantity={quantity}
                    increase={() => dispatch({ type: 'increase' })}
                    decrease={() => dispatch({ type: 'decrease' })} />
                <ProductTotal id={id} addons={addons} quantity={quantity} />
            </div>
            <AddToCart id={id} addons={addons} quantity={quantity} />
        </>
    )
}
