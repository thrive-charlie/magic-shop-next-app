import React, { useCallback, useEffect, useState } from 'react'
import Addon from '@/components/products/Addon';

export default function AddonGroup({ group, addons, groupUpdated }) {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const singleOption = true;

    const isSelected = useCallback((addonId) => selectedOptions.some((addon) => addon.id === addonId), [selectedOptions]);
    const handleAddonClick = (addon) => {
        if (singleOption) {
            setSelectedOptions([addon]);
        } else {
            if (isSelected(addon.id)) {
                setSelectedOptions(selectedOptions.filter((selected) => selected.id !== addon.id));
            } else {
                setSelectedOptions([...selectedOptions, addon]);
            }
        }
    };

    useEffect(() => {
        if (selectedOptions) {
            groupUpdated(group.id, selectedOptions);
        }
    }, [selectedOptions]);

    return (
        <div className="mb-4">
            <h3 className="text-xl font-bold tracking-tighter mb-6">Select your {group.group_name}</h3>
            <div className="grid grid-cols-2 gap-4">
                {group.addons.map((addon) => (
                    <Addon
                        key={addon.id}
                        clickHandler={handleAddonClick}
                        selected={isSelected(addon.id)}
                        {...addon}
                    />
                ))}
            </div>
        </div>
    )
}
