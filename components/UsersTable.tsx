import { User } from '@/lib/types'
import React from 'react'

type Props = {
    data: User[]
}

const UsersTable = ({ data }: Props) => {

    console.log(data)

    return (
        <div className='overflow-x-auto'>
            <div className='flex flex-col'>
                <div className='bg-dark-100 py-4 px-2 gap-2 w-full font-bold flex rounded-t-lg'>
                    <p className=' w-[75px] text-center'>ID</p>
                    <p className='text-left w-[250px]'>Name</p>
                    <p className='text-left w-[75px]'>Class</p>
                    <p className='text-left w-[300px]'>Email</p>
                    <p className='text-left w-[250px]'>Cards</p>
                    <p className='w-[100px]'>Role</p>
                </div>
                {data?.map((item, index) => (
                    <div key={item.id} className={`px-2 gap-2 py-4 ${index % 2 === 0 ? 'bg-transparent' : 'bg-dark-100/30'} flex`}>
                        <div className='w-[75px] text-center'>
                            <p>{item.id}</p>
                        </div>
                        <div className='text-left w-[250px]'>
                            <p>{item.firstname} {item.lastname}</p>
                        </div>
                        <div className='text-left w-[75px]'>
                            <p>{item.class}</p>
                        </div>
                        <div className='text-left w-[300px]'>
                            <p>{item.email}</p>
                        </div>
                        <div className='text-left w-[250px] flex gap-2'>
                            {item.cards[0].id != null ? item.cards.map((card, index) => (
                                <span key={index} className='text-blue-500 hover:cursor-pointer'>[{card.id}]</span>
                            )) : <p className='text-gray-400'>Brak</p>}
                        </div>
                        <div className='text-left w-[100px]'>
                            <p className={`capitalize ${item.role === 'admin' && 'text-red-500'}`}>{item.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersTable