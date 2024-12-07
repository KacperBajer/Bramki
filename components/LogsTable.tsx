import { formatDate } from '@/lib/func'
import { Logs } from '@/lib/types'
import React from 'react'

type Props = {
    data: Logs[]
}

const LogsTable = ({ data }: Props) => {

    return (
        <div className='overflow-x-auto'>
                <div className='flex flex-col'>
                    <div className='bg-dark-100 py-4 px-2 gap-2 w-full font-bold flex rounded-t-lg'>
                        <p className=' w-[75px] text-center'>ID</p>
                        <p className='text-left w-[250px]'>User</p>
                        <p className='text-left w-[300px]'>Action</p>
                        <p className='text-center w-[100px]'>Status</p>
                        <p className='text-left w-[200px]'>Date</p>
                        <p className='min-w-[200px] flex-1'>Comment</p>
                    </div>
                    {data?.map((item, index) => (
                        <div key={item.id} className={`px-2 gap-2 py-4 ${index % 2 === 0 ? 'bg-transparent' : 'bg-dark-100/30'} flex`}>
                            <div className='w-[75px] text-center'>
                                <p>{item.id}</p>
                            </div>
                            <div className='text-left w-[250px]'>
                                <p>{item.firstname} {item.lastname} ({item.userid})</p>
                            </div>
                            <div className='text-left w-[300px]'>
                                <p>{item.action}</p>
                            </div>
                            <div className={`text-center font-medium w-[100px] ${item.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                <p>{item.status}</p>
                            </div>
                            <div className='text-left w-[200px]'>
                                <p>{formatDate(item.date)}</p>
                            </div>
                            <div className='min-w-[200px] flex-1min-w-[200px] flex-1'>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default LogsTable