import React from 'react'
import { IoMdClose } from 'react-icons/io'

type Props = {
    setShowPopup: (e: boolean) => void
    id: number
}

const DeleteUserPopup = ({ setShowPopup, id }: Props) => {
    return (
        <div className='w-full bg-black/50 z-10 h-screen fixed top-0 left-0 flex justify-center items-center'>
            <div className='px-10 py-6 bg-black relative border-2 border-dark-100 rounded-lg w-[400px]'>
                <IoMdClose className='absolute top-5 right-5 hover:cursor-pointer text-xl' onClick={() => setShowPopup(false)} />
                <p className='text-2xl font-bold text-center mb-8'>Delete user</p>
                <p>Are you sure, you want to delete user with ID: {id}?</p>
            </div>
        </div>
    )
}

export default DeleteUserPopup