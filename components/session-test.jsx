"use client";

import React from 'react'
import { useSession } from 'next-auth/react';

export default function SessionTest() {
  
    const { data: session } = useSession();
    console.log({ session });
  
    return (
    <div>
        <p>Session test</p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
