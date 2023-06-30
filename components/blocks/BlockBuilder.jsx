"use client";
import React from 'react'
import PolaroidContent from './PolaroidContent';

export default function BlockBuilder({ blocks }) {

    const blockComponents = {
        'polaroid_content': PolaroidContent,
    };

    return (
        <>
            {blocks.map((block, index) => {
                if (!blockComponents[block.acf_fc_layout]) {
                    return <pre className='p-2 bg-slate-200 mb-2 rounded' key={index}>Block {block.acf_fc_layout} not found</pre>
                }
                return React.createElement(blockComponents[block.acf_fc_layout], {key: index, ...block})
            })}
        </>
    );
}
