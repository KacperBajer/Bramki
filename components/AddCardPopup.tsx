'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import InputField from './InputField'
import Button from './Button'
import SelectBox from './SelectBox'
import { IoMdClose } from 'react-icons/io'
import { z } from 'zod'
import { addCard } from '@/lib/users'
import { toast } from 'react-toastify'

type Props = {
    setShowPopup: (e: boolean) => void
    userid: number
}

const AddCardPopup = ({setShowPopup, userid}: Props) => {
    
    type FormErrors = Partial<Record<keyof FormData, string[]>>
    type FormData = z.infer<typeof formSchema>

    const [formData, setFormData] = useState({
        id: ''
    })
    const [type, setType] = useState('RFID')

    const [errors, setErrors] = useState<FormErrors>({})

    const formSchema = z.object({
        id: z.string().min(1, "Id is required"),
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
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const checkErros = validateForm()
        setErrors(checkErros)
        if(Object.keys(checkErros).length !== 0) {
            return
        }
        const res = await addCard(userid, parseInt(formData.id), (type as "UHF" | 'RFID'))
        if(res.status === 'failed') {
            toast.error(res.error || "Something went wrong")
            return
        }
        toast.success("Card added")
        setShowPopup(false)
    }

  return (
    <div className='w-full bg-black/50 z-10 h-screen fixed top-0 left-0 flex justify-center items-center'>
        <div className='px-10 py-6 bg-black border-2 border-dark-100 rounded-lg w-[350px] relative'>
            <IoMdClose className='absolute top-5 right-5 hover:cursor-pointer text-xl' onClick={() => setShowPopup(false)} />
            <p className='text-center text-2xl font-bold mb-8'>Add card</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <InputField 
                    name='id'
                    value={formData.id}
                    onChange={handleChange}
                    label='Card ID'
                    placeholder='Card ID'
                    error={errors.id && errors.id[0]}
                />
                <SelectBox 
                    selected={type}
                    setSelected={setType}
                    data={['RFID', "UHF"]}
                />
                <Button 
                    text='Submit'
                    type='submit'
                />
            </form>
        </div>
    </div>
  )
}

export default AddCardPopup