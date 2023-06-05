import Link from 'next/link'
import React from 'react'
import Button from '../common/button'
import {BsArrowRight} from 'react-icons/bs'

export default function ProductCard({ name, slug, description, price, image }) {
  return (
    <article className='p-4 bg-white shadow-lg'>
        {image && (
            <figure className='mb-4'>
                <img src={image} alt={name} />
            </figure>
        )}
        <div>
            <h2 className='text-2xl font-bold mb-2 tracking-tighter'>{name}</h2>
            <p className='mb-4'>{description}</p>
            <Button 
                as={Link}
                icon={BsArrowRight}
                href={`/products/${slug}`}>
                    View Product
            </Button>
        </div>
    </article>
  )
}
