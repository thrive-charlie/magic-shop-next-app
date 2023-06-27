import Image from 'next/image'
import React from 'react'

export default function ProductGallery({ images }) {
    return (
        <aside className='bg-white p-4 shadow-md my-20'>
            <div className="product-gallery-grid">
                {images.map(({ id, image, alt }) => (
                    <Image
                        key={id}
                        src={image.url}
                        alt={alt}
                        width={600}
                        height={400}
                        placeholder="blur"
                        blurDataURL={image.placeholder} />
                ))}
            </div>
        </aside>
    )
}
