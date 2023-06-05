import React from 'react'
import Link from 'next/link';
import { ImSpinner8 } from 'react-icons/im';

export default function Button({ as, icon, loading, children, ...props}) {

    const Component = as || 'button';
    const Icon = icon || null;

  return (
    <Component 
        className="inline-flex items-center px-4 py-2 bg-violet-900 text-white rounded transition-all hover:bg-opacity-75"
        style={{ opacity: loading ? 0.5 : 1 }}
        {...props}>
            {children}
            {(Icon && !loading) && <Icon className="ml-2 w-4 h-4" />}
            {loading && <ImSpinner8 className="ml-2 animate-spin" />}
    </Component>
  )
}
