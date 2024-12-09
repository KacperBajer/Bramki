import SideBar from '@/components/SideBar';
import { getUser } from '@/lib/users'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const user = await getUser()
    if(!user || user.role !== 'Admin') {
        redirect('/sign-in')
    }

  return (
    <div className='p-4 flex w-full'>
        <SideBar user={user} />
        {children}
    </div>
  )
}

export default layout