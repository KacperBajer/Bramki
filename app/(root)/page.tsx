import ControllerCard from '@/components/ControllerCard'
import { getControllers } from '@/lib/controllers'
import React from 'react'

const page = async () => {

  const controllers = await getControllers()

  return (
    <div className='w-full min-h-[calc(100vh-32px)] border-2 border-dark-100 rounded-md py-6 px-4'>
      <section className='mb-8'>
        <p className='text-2xl mb-4 ml-1'>Go In</p>
        <div className='flex flex-wrap gap-5'>
          {controllers.data?.in.map(item => (
            <ControllerCard id={item.id} mode={item.mode} name={item.name} type={item.type} key={item.id} />
          ))}
        </div>
      </section>

      <section>
        <p className='text-2xl mb-4 ml-1'>Go Out</p>
        <div className='flex flex-wrap gap-5'>
          {controllers.data?.out.map(item => (
            <ControllerCard id={item.id} mode={item.mode} name={item.name} type={item.type} key={item.id} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default page