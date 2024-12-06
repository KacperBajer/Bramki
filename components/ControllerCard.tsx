'use client'
import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { Controller } from '@/lib/types'
import { openController } from '@/lib/controllers'

const ControllerCard = ({type, name, id, mode}: Controller) => {

    const open = async () => {
        const res = await openController(id, name)
        console.log(res)
    }

    return (
        <div className='flex flex-col items-center border-2 p-5 rounded-xl border-dark-100'>
            <Image
                alt=''
                src={type === 'barrier' ? '/barrier-icon.png' : '/gate-icon.png'}
                className='w-[100px] h-[100px]'
                width={100}
                height={100}
            />
            <p className='mt-2 font-bold'>{name}</p>
            <Button
                text='Open'
                className='mt-4'
                onClick={open}
            />
        </div>
    )
}

export default ControllerCard