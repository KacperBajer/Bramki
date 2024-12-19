import React, { useState } from 'react'
import Button from './Button'
import { deleteUser } from '@/lib/users'
import { toast } from 'react-toastify'

type Props = {
    setShowPopup: (e: boolean) => void
    id: number
}

const DeleteUserPopup = ({ setShowPopup, id }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    
const onSubmit = async () => {
    try {
        setIsLoading(true)
        const del = await deleteUser(id)
        
        if(del.status === 'failed') {
            toast.error(del.error || 'Something went wrong!')
            return
        }

        toast.success('User deleted')

        setShowPopup(false)

    } catch (error) {
        console.log(error)
        toast.error('Something went wrong!')
    } finally {
        setIsLoading(false)
    }
}

    return (
        <div className='w-full bg-black/50 z-10 h-screen fixed top-0 left-0 flex justify-center items-center'>
            <div className='px-10 py-6 bg-black relative border-2 border-dark-100 rounded-lg w-[400px]'>
                <p className='text-2xl font-bold text-center mb-3'>Delete user</p>
                <p className='text-gray-400 text-sm text-center'>Are you sure, you want to delete user with ID: {id}?</p>
                <div className='flex gap-3 mt-5'>
                    <Button 
                        text={isLoading ? 'Loading...' : 'Confirm'}
                        className='bg-green-700 hover:bg-green-800'
                        onClick={onSubmit}
                        disabled={isLoading}
                    />
                    <Button 
                        text='Cancel'
                        className='bg-red-700 hover:bg-red-800'
                        onClick={() => setShowPopup(false)}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}

export default DeleteUserPopup