'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import InputField from './InputField'
import Button from './Button'
import { z } from 'zod'
import { loginUser } from '@/lib/users'

const SignInForm = () => {

    type FormErrors = Partial<Record<keyof FormData, string[]>>
    type FormData = z.infer<typeof formSchema>

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const formSchema = z.object({
        email: z.string().min(1, "Email is required"),
        password: z.string().min(1, "Password is required")
    })

    
    const validateForm = () => {
        try {
            const checkErros = formSchema.parse(formData)
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
        if(Object.keys(checkErros).length !== 0) {
            return
        }
        const ans = await loginUser(formData.email, formData.password)
        console.log(ans)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <InputField 
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            error={errors.email && errors.email[0]}
        />
        <InputField 
            placeholder='Password'
            name='password'
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password && errors.password[0]}
        />
        <Button type='submit' text='Submit' className='mt-1' />
    </form>
  )
}

export default SignInForm