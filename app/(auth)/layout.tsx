import { getUser } from '@/lib/users'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const user = await getUser()
    if(user) {
        redirect('/')
    }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        {children}
    </div>
  )
}

export default layout