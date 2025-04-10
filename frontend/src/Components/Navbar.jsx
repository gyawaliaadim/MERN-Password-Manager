import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-[var(--navbar-height)] justify-center items-center w-full bg-[var(--navbar-bg)] text-white'>
        <ul className='flex justify-around w-full items-center font-extrabold text-2xl h-full'>
            
            <li className=" flex cursor-pointer hover:bg-[#344a6a] transition-all duration-75 p-1  rounded-full justify-center items-center">
                <span className='text-green-400'>&lt;</span>
                <span>PassManager</span>
                <span className='text-green-400'>/</span>
                <span className='text-green-400'>&gt;</span>
            </li>

            <li className="cursor-pointer hover:bg-[#344a6a] p-1 rounded-full flex justify-center items-center max-[805px]:text-[1rem] max-[385px]:hidden">
                <span className='max-[440px]:hidden'>Tech Stack- </span>
                <span>HTML, Tailwind CSS, React, MongoDB</span>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
