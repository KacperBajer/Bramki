import React from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from './Button'

type Props = {
    setShowPopup: (e: boolean) => void
    id: number
}

const DeleteUserPopup = ({ setShowPopup, id }: Props) => {
    return (
        <div className='w-full bg-black/50 z-10 h-screen fixed top-0 left-0 flex justify-center items-center'>
            <div className='px-10 py-6 bg-black relative border-2 border-dark-100 rounded-lg w-[400px]'>
                <p className='text-2xl font-bold text-center mb-3'>Delete user</p>
                <p className='text-gray-400 text-sm text-center'>Are you sure, you want to delete user with ID: {id}?</p>
                <div className='flex gap-3 mt-5'>
                    <Button 
                        text='Confirm'
                        className='bg-green-700 hover:bg-green-800'
                    />
                    <Button 
                        text='Cancel'
                        className='bg-red-700 hover:bg-red-800'
                        onClick={() => setShowPopup(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default DeleteUserPopup