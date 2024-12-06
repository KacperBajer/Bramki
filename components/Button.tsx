import React, { ButtonHTMLAttributes } from 'react'

type Props = {
    text: string
    onClick?: () => void 
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({text, onClick, className, ...other}: Props) => {
  return (
    <button {...other} onClick={onClick} className={`w-full rounded-md bg-blue-600 py-1.5 px-4 outline-none appearance-none hover:bg-blue-700 transition-all duration-300 text-sm ${className}`}>
        {text}
    </button>
  )
}

export default Button