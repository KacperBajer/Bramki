'use client'
import { SideBarLinks } from '@/lib/constants'
import { deleteSession } from '@/lib/sessions'
import { User } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    user: User
}

const SideBar = ({user}: Props) => {

    const path = usePathname()

    const handleLogout = async () => {
        const res = await deleteSession()
        if(res === 'success' ) {
            redirect('/sign-in')
        }
    }

  return (
    <div className='sticky top-0 left-0 rounded-md flex flex-col justify-between border-2 h-fit min-h-[calc(100vh-32px)] border-dark-100 py-6 px-4 min-w-[300px] max-w-[300px] mr-6'>
        <section className='flex flex-col'>
            <p className='text-3xl font-bold text-center'>Bramki</p>
            <div className='flex flex-col gap-1 mt-20'>
                {SideBarLinks.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`w-full hover:bg-dark-100/60 px-4 py-2 rounded-md flex items-center gap-4 ${path === item.href || (item.href !== '/' && path.startsWith(item.href)) ? 'bg-dark-100/60' : ''}`}
                    >
                        {item.icon}
                        <p>{item.name}</p>
                    </Link>
                ))}
            </div>
        </section>

        <section>
            <div className='flex items-center gap-3'>
                <Image 
                    alt=''
                    src={'/avatar.png'}
                    className='w-10 h-10 rounded-full'
                    width={40}
                    height={40}
                />
                <div className='flex flex-col'>
                    <p className='text-sm text-gray-100'>{user.firstname} {user.lastname}</p>
                <button onClick={handleLogout} className='text-xs text-gray-400 text-left'>Logout</button>
                </div>

            </div>
        </section>
        
    </div>
  )
}

export default SideBar