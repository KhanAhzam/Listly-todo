import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-center sm:justify-between bg-emerald-500 items-center text-white pt-2 pb-3'>
            <div className="logo mx-8 flex items-center">
                <span className='text-3xl tracking-wide font-pacifico font-extralight pb-1'>Listly</span>
            </div>
            <div className="big_container hidden sm:block">
                <ul className="flex mx-8">
                    <li className='cursor-pointer hover:font-bold transition-all text-lg sm:w-22'>Home</li>             {/* min-w-22 */}
                    <li className='cursor-pointer hover:font-bold transition-all text-lg sm:w-22'>Your Tasks</li>               {/* min-w-22 */}
                </ul>
            </div>



        </nav>
    )
}

export default Navbar
