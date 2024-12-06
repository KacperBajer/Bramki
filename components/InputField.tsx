import React, { ChangeEvent, InputHTMLAttributes } from 'react'

type Props = {
    label?: string
    name: string
    placeholder?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    error?: string
} & InputHTMLAttributes<HTMLInputElement>

const InputField = ({label, name, placeholder, onChange, value, error, ...other}: Props) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={name} className='ml-1 mb-1 text-gray-300 text-sm'>{label}</label>
        <input 
           {...other} 
           name={name}
           onChange={onChange}
           value={value}
           placeholder={placeholder}
           className='w-full py-2 px-4 border-2 border-dark-100 rounded-md outline-none bg-transparent text-sm appearance-none'
        />
        {error && <p className='text-xs text-red-500 ml-1 mt-1.5'>{error}</p>}
    </div>
  )
}

export default InputField