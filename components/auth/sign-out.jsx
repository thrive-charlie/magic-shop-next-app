"use client";

import React from 'react'
import { signIn, signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <div>
      <button className='p-2 rounded bg-slate-900 text-white mr-4' onClick={(() => signIn())}>Sign In</button>
      <button onClick={(() => signOut())}>Sign out</button>
    </div>
  )
}
