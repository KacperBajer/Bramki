import SideBar from '@/components/SideBar';
import { User } from '@/lib/types';
import { getUser } from '@/lib/users'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const user = await getUser()
    console.log('user: ', !user, 'user and role: ', !user || user.role !== 'Admin')


  return (
    <div className='p-4 flex w-full'>
        <SideBar user={user as User} />
        {children}
    </div>
  )
}

export default layout