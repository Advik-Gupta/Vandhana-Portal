import React from 'react'

function Button({text,className}) {
  return (
    <button className={`bg-black text-white p-2 mt-4 rounded ${className}`}>
        {text}
      </button>
  )
}

export default Button