'use client'
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import InputField from './InputField'
import { z } from 'zod'
import Button from './Button'
import SelectBox from './SelectBox'
import { IoMdClose } from "react-icons/io";
import { createUser } from '@/lib/users'
import { toast } from 'react-toastify'

type Props = {
  setShowPopup: (e: boolean) => void
}

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  password: z.string().min(1, "Password is required"),
  email: z.string().email("Invalid email address"),
  class: z.string()
})

const CreateUserPopup = ({ setShowPopup }: Props) => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    class: '',
    password: ''
  })

  const [role, setRole] = useState('User')

  type FormErrors = Partial<Record<keyof FormData, string[]>>
  type FormData = z.infer<typeof schema>

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    try {
      const checkErros = schema.parse(formData)
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      return {};
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const checkErros = validateForm()
    setErrors(checkErros)
    if (Object.keys(checkErros).length !== 0) {
      return
    }
    const res = await createUser(formData.email, formData.password, formData.firstname, formData.lastname, formData.class, role)
    if (res.status === 'success') {
      toast.success('User created!')
      setShowPopup(false)
      return
    }
    toast.error(res.error || 'Something went wrong!')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='w-full bg-black/50 z-10 h-screen fixed top-0 left-0 flex justify-center items-center'>
      <div className='px-10 py-6 bg-black relative border-2 border-dark-100 rounded-lg w-[400px]'>
        <IoMdClose className='absolute top-5 right-5 hover:cursor-pointer text-xl' onClick={() => setShowPopup(false)} />
        <p className='text-2xl font-bold text-center mb-8'>Create user</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <InputField
            onChange={handleChange}
            value={formData.firstname}
            name='firstname'
            label='First name'
            placeholder='First name'
            error={errors.firstname && errors.firstname[0]}
          />
          <InputField
            onChange={handleChange}
            value={formData.lastname}
            name='lastname'
            label='Last name'
            placeholder='Last name'
            error={errors.lastname && errors.lastname[0]}
          />
          <InputField
            onChange={handleChange}
            value={formData.email}
            name='email'
            label='Email'
            placeholder='Email'
            error={errors.email && errors.email[0]}
          />
          <InputField
            onChange={handleChange}
            value={formData.password}
            name='password'
            label='Password'
            placeholder='Password'
            type='password'
            error={errors.password && errors.password[0]}
          />
          <InputField
            onChange={handleChange}
            value={formData.class}
            name='class'
            label='Class'
            placeholder='Class'
            error={errors.class && errors.class[0]}
          />
          <div>
            <p className='text-sm ml-1 mb-1 text-gray-300'>Role</p>
            <SelectBox selected={role} setSelected={setRole} data={['User', 'Admin']} />
          </div>
          <Button type='submit' text='Submit' className='mt-1' />
        </form>

      </div>
    </div>
  )
}

export default CreateUserPopup