import React from 'react'
import Button from '../common/button'
import Link from 'next/link'

export default function PolaroidContent({ title, content, polaroid_image, link, link_text, display_video, video_url }) {
  return (
    <div className="my-8">
        <section className="cms-center-content" data-aos="fade-left">
            <div className="content">
                <h2 className="text-2xl font-bold tracking-tighter mb-2">{title}</h2>
                <div className='mb-4' dangerouslySetInnerHTML={{ __html: content }} />
                <Button as={Link} href={link.url}>
                    {link_text}
                </Button>
            </div>
        </section>
    </div>
  )
}
