'use client'
import LogsTable from '@/components/LogsTable'
import { getLogs } from '@/lib/logs'
import { Logs } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { OrbitProgress } from 'react-loading-indicators'
import { toast } from 'react-toastify'

const page = () => {

    const [logs, setLogs] = useState<Logs[] | null>(null)
    const [totalRows, setTotalRows] = useState(0)
    const [page, setPage] = useState(1)
    const [id, setId] = useState('')

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await getLogs(page, parseInt(id))
            console.log(res)
            if(res.status == 'failed') {
                toast.error(res.error || 'Something went wrong')      
                return
            }
            setLogs(res.data as Logs[])
            setTotalRows(res.totalRows as number)
        }
        fetchLogs()

        const intervalId = setInterval(() => {
            fetchLogs();
        }, 5000); 

        return () => clearInterval(intervalId);

    }, [page, id])

    if(!logs) {
        return <div  className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4 flex justify-center items-center'>
            <OrbitProgress color="#FFFFFF" size="small" text="" textColor="" />
        </div>
    }

  return (
    <div className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4 overflow-x-hidden'>
        <div className='mb-8 flex justify-between items-center'>
            <p className='ml-1 text-2xl font-bold'>Logs</p>
            <div className='max-w-[200px]'>
                <input 
                    placeholder='User ID'
                    className='w-full py-2 px-4 border-2 border-dark-100 rounded-md outline-none bg-transparent text-sm appearance-none'
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                    name='id'
                />
            </div>
        </div>
        <LogsTable data={logs} />
        <div className='mt-5 flex justify-between items-start mx-4'>
            <p className='text-gray-300'>Page {page} of {Math.ceil(totalRows / 50)}</p>            
            <div>
                <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)} className={`p-2 ${page === 1 ? "bg-dark-100" : 'bg-blue-600'} rounded-xl mr-2`}><IoIosArrowBack className='text-[24px]' /></button>
                <button disabled={totalRows / 50 <= page} onClick={() => setPage(prev => prev + 1)}  className={`p-2 ${totalRows / 50 <= page ? 'bg-dark-100' : 'bg-blue-600'} rounded-xl`}><IoIosArrowBack className='text-[24px] rotate-180' /></button>
            </div>
        </div>
    </div>
  )
}

export default page