'use client'
import Button from '@/components/Button'
import UsersTable from '@/components/UsersTable'
import { User } from '@/lib/types'
import { getUsers } from '@/lib/users'
import React, { useEffect, useState } from 'react'
import { OrbitProgress } from 'react-loading-indicators'

const page = () => {

    const [users, setUsers] = useState<User[] | null>(null)
    const [totalRows, setTotalRows] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await getUsers(page)
            console.log(res)
            if(res.status == 'failed') {
                return
            }
            setUsers(res.data as User[])
            setTotalRows(res.totalRows as number)
        }
        fetchLogs()

        const intervalId = setInterval(() => {
            fetchLogs();
        }, 5000); 

        return () => clearInterval(intervalId);

    }, [page])

    if(!users) {
        return <div  className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4 flex justify-center items-center'>
            <OrbitProgress color="#FFFFFF" size="small" text="" textColor="" />
        </div>
    }


  return (
    <div className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4'>
        <div className='flex justify-between mb-8 px-2 items-center'>
            <p className='font-bold text-2xl'>Users</p>
            <Button 
                text={'Add'}
                className='w-fit px-6 py-2 font-bold'
            />
        </div>
        <UsersTable data={users} />
    </div>
  )
}

export default page