import React from 'react'
import Link from 'next/link';
import { ImSpinner8 } from 'react-icons/im';

export default function Button({ as, icon, loading, style = '', children, ...props }) {

  const Component = as || 'button';
  const Icon = icon || null;
  
  let styleClasses = 'bg-violet-900 text-white hover:bg-opacity-75';
  if (style === 'outline') {
    styleClasses = 'bg-transparent text-violet-900 border border-violet-900 hover:bg-violet-900 hover:text-white';
  }

  return (
    <Component
      className={`inline-flex justify-center items-center px-4 py-2 rounded transition-all ${styleClasses}`}
      style={{ opacity: loading ? 0.5 : 1 }}
      {...props}>
      {children}
      {(Icon && !loading) && <Icon className="ml-2 w-4 h-4" />}
      {loading && <ImSpinner8 className="ml-2 animate-spin" />}
    </Component>
  )
}
