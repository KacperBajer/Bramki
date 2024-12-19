'use client'
import { Card, User } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import CardInfoPopup from './CardInfoPopup'
import Button from './Button'
import EditUserPopup from './EditUserPopup'
import { IoAddCircle } from "react-icons/io5";
import AddCardPopup from './AddCardPopup'
import DeleteUserPopup from './DeleteUserPopup'
import { FaTrash } from "react-icons/fa";

type Props = {
    data: User[]
    fetchUsers: () => void
}

const UsersTable = ({ data, fetchUsers }: Props) => {

    const [showCardPopup, setShowCardPopup] = useState<Card | boolean>(false)
    const [showEditUserPopup, setShowEditUserPopup] = useState<boolean | User>(false)
    const [showAddCardPopup, setShowAddCardPopup] = useState<number | boolean>(false)
    const [showDeleteUserPopup, setShowDeleteUserPopup] = useState<boolean | number >(false)

    useEffect(() => {
        fetchUsers()
    }, [showEditUserPopup, showAddCardPopup, showDeleteUserPopup, showCardPopup])

    return (
        <>
            {showDeleteUserPopup && <DeleteUserPopup setShowPopup={setShowDeleteUserPopup} id={showDeleteUserPopup as number} />}
            {showCardPopup && <CardInfoPopup card={showCardPopup as Card} setShowPopup={setShowCardPopup} />}
            {showEditUserPopup && <EditUserPopup setShowPopup={setShowEditUserPopup} user={showEditUserPopup as User} />}
            {showAddCardPopup && <AddCardPopup setShowPopup={setShowAddCardPopup} userid={showAddCardPopup as number} />}
            <div className='overflow-x-auto'>
                <div className='flex flex-col min-w-[1100px]'>
                    <div className='bg-dark-100 py-4 px-4 gap-2 w-full font-bold flex rounded-t-lg'>
                        <p className=' w-[75px] text-center'>ID</p>
                        <p className='text-left w-[250px]'>Name</p>
                        <p className='text-left w-[75px]'>Class</p>
                        <p className='text-left w-[300px]'>Email</p>
                        <p className='text-left w-[250px]'>Cards</p>
                        <p className='min-w-[100px] flex-1'>Role</p>
                        <p className='text-center w-[100px]'>Edit</p>
                    </div>
                    {data?.map((item, index) => (
                        <div key={item.id} className={`px-4 gap-2 py-4 ${index % 2 === 0 ? 'bg-transparent' : 'bg-dark-100/30'} flex`}>
                            <div className='w-[75px] flex items-center justify-center text-center'>
                                <p>{item.id}</p>
                            </div>
                            <div className='text-left flex items-center w-[250px]'>
                                <p>{item.firstname} {item.lastname}</p>
                            </div>
                            <div className='text-left flex items-center w-[75px]'>
                                <p>{item.class}</p>
                            </div>
                            <div className='text-left flex items-center w-[300px]'>
                                <p>{item.email}</p>
                            </div>
                            <div className='text-left w-[250px] flex flex-wrap gap-2'>
                                {item.cards[0].id && item.cards.map((card, index) => (
                                    <button onClick={() => setShowCardPopup(card)} key={index} className='text-blue-500 hover:cursor-pointer'>[{card.id}]</button>
                                ))}
                                <IoAddCircle onClick={() => setShowAddCardPopup(item.id)} className='text-[24px] text-green-500 hover:cursor-pointer translate-y-1' />
                            </div>
                            <div className='text-left min-w-[100px] flex items-center flex-1'>
                                <p className={`capitalize ${item.role === 'Admin' && 'text-red-500'}`}>{item.role}</p>
                            </div>
                            <div className='w-[100px] flex items-center '>
                                <Button 
                                    text='Edit'
                                    className='bg-dark-100'
                                    onClick={() => setShowEditUserPopup(item)}
                                />
                            </div>
                            <div className='w-[50px] flex items-center justify-center'>
                                <button onClick={() => setShowDeleteUserPopup(item.id)} className='p-2 rounded-md bg-dark-100 hover:cursor-pointer'>
                                    <FaTrash className='text-red-600' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default UsersTable