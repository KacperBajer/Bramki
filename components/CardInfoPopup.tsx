'use client'
import { Card } from '@/lib/types'
import { deleteCard } from '@/lib/users'
import React, { useEffect, useRef, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

type Props = {
    card: Card
    setShowPopup: (e: Card | boolean) => void
}

const CardInfoPopup = ({card, setShowPopup}: Props) => {

    const ref = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowPopup(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handleDelete = async () => {
        try {
          setIsLoading(true)
          const res = await deleteCard(card.id)
          
          if(res.status === 'failed') {
            toast.error(res.error || 'Something went wrong!')
            return
          }
          
          toast.success('Card deleted')

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
        <div ref={ref} className='px-10 py-6 bg-black border-2 border-dark-100 rounded-lg '>
            <p className='text-center text-2xl font-bold mb-4'>Card Info</p>
            <div className='flex gap-3 items-center'>
              <p className='text-base'>ID: {card.id} ({card.type})</p>
              <button disabled={isLoading} onClick={handleDelete} className='p-2 rounded-md bg-dark-100 hover:cursor-pointer'>
                <FaTrash className='text-red-600' />
              </button>
            </div>
        </div>
    </div>
  )
}

export default CardInfoPopup