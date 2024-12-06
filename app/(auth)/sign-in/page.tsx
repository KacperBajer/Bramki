import SignInForm from '@/components/SignInForm'
import React from 'react'

const page = () => {
  return (
    <div className='rounded-lg flex flex-col border-2 border-dark-100 p-10 w-[400px]'>
        <p className='text-center font-bold text-3xl mb-4'>Sign In</p>
        <p className='text-gray-400 mb-8 text-center'>Sign in to acces to your dashbaord</p>
        <SignInForm />
    </div>
  )
}

export default page