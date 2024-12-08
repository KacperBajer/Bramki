import React from 'react'
import clsx from 'clsx'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa";

type Props = {
    selected: string
    setSelected: (e: string) => void
    data: string[]
}

const SelectBox = ({selected, setSelected, data}: Props) => {
  return (
    <div className='w-full z-50'>
    <Listbox value={selected} onChange={setSelected}>
    <ListboxButton
        className={clsx(
        'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
        )}
    >
        {selected ? selected : 'Loading...' }
        <FaAngleDown className="group pointer-events-none absolute top-2.5 right-2.5 text-lg fill-white/60" aria-hidden="true" />
    </ListboxButton>
    <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
        'w-[var(--button-width)] rounded-xl mt-2 border border-white/5 bg-black6 bg-dark-100 z-50 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
    >
        {data?.map((item) => (
        <ListboxOption
            key={item}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
        >
            <div className="text-sm/6 text-white">{item}</div>
        </ListboxOption>
        ))}
    </ListboxOptions>
    </Listbox>
</div>
  )
}

export default SelectBox