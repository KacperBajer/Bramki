'use client'
import { Card } from '@/lib/types'
import React, { useEffect, useRef } from 'react'

type Props = {
    card: Card
    setShowPopup: (e: Card | boolean) => void
}

const CardInfoPopup = ({card, setShowPopup}: Props) => {

    const ref = useRef<HTMLDivElement>(null)
    
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
  return (
    <div className='w-full bg-black/50 z-10 h-screen fixed top-0 left-0 flex justify-center items-center'>
        <div ref={ref} className='px-10 py-6 bg-black border-2 border-dark-100 rounded-lg '>
            <p className='text-center text-2xl font-bold mb-4'>Card Info</p>
            <p className='text-base'>ID: {card.id} ({card.type})</p>
        </div>
    </div>
  )
}

export default CardInfoPopup