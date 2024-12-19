'use client'
import Button from '@/components/Button'
import CreateUserPopup from '@/components/CreateUserPopup'
import DeleteUserPopup from '@/components/DeleteUserPopup'
import UsersTable from '@/components/UsersTable'
import { User } from '@/lib/types'
import { getUsers } from '@/lib/users'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { OrbitProgress } from 'react-loading-indicators'

const page = () => {

    const [users, setUsers] = useState<User[] | null>(null)
    const [totalRows, setTotalRows] = useState(0)
    const [page, setPage] = useState(1)
    const [showCreateUserPopup, setShowCreateUserPopup] = useState(false)

    const fetchUsers = async () => {
        const res = await getUsers(page)
        console.log(res)
        if (res.status == 'failed') {
            return
        }
        setUsers(res.data as User[])
        setTotalRows(res.totalRows as number)
    }

    useEffect(() => {
        fetchUsers()

        const intervalId = setInterval(() => {
            fetchUsers();
        }, 5000);

        return () => clearInterval(intervalId);

    }, [page, showCreateUserPopup])

    if (!users) {
        return <div className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4 flex justify-center items-center'>
            <OrbitProgress color="#FFFFFF" size="small" text="" textColor="" />
        </div>
    }


    return (
        <>
            {showCreateUserPopup && <CreateUserPopup setShowPopup={setShowCreateUserPopup} />}
            <div className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4 overflow-x-hidden'>
                <div className='flex justify-between mb-8 px-2 items-center'>
                    <p className='font-bold text-2xl'>Users</p>
                    <div className='w-[100px]'>
                        <Button
                            text={'Add'}
                            className='px-6 py-2 font-bold'
                            onClick={() => setShowCreateUserPopup(true)}
                        />
                    </div>
                </div>
                <UsersTable data={users} fetchUsers={fetchUsers} />
                <div className='mt-5 flex justify-between items-start mx-4'>
                    <p className='text-gray-300'>Page {page} of {Math.ceil(totalRows / 50)}</p>
                    <div>
                        <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)} className={`p-2 ${page === 1 ? "bg-dark-100" : 'bg-blue-600'} rounded-xl mr-2`}><IoIosArrowBack className='text-[24px]' /></button>
                        <button disabled={totalRows / 50 <= page} onClick={() => setPage(prev => prev + 1)} className={`p-2 ${totalRows / 50 <= page ? 'bg-dark-100' : 'bg-blue-600'} rounded-xl`}><IoIosArrowBack className='text-[24px] rotate-180' /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page