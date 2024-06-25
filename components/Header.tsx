'use client'
import { IsLogin } from '@/context/IsLogin'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

function Header() {
    const router = useRouter()
    const loginContext = useContext(IsLogin)
    if (!loginContext) {
        throw new Error('This faild must be only boolean')
    }
    const { isLogin, setIsLogin } = loginContext
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const handelClick = () => {
        setShowProfile(false)
        deleteCookie('token')
        setIsLogin(false)
        router.push('/')
    }
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
                <div className="flex w-full justify-evenly md:justify-between items-center mx-auto max-w-screen-xl">
                    <Link href={'/'} className="flex items-center">
                        <Image width={100} height={100} src="https://flowbite.com/docs/images/logo.svg" className="hidden md:inline-block md:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Chatcom</span>
                    </Link>
                    {!isLogin && <div className="flex items-center lg:order-2">
                        <Link href={"/login"} passHref className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 border">Log in</Link>
                        <Link href={"/register"} className="hidden md:inline-block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 border">Register</Link>
                        <button data-collapse-toggle="mobile-menu-2" onClick={() => setShowMenu(!showMenu)} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <div className='relative'>
                            {showMenu && <div
                                className="absolute top-6 end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                                role="menu"
                            >
                                <div className="p-2">
                                    <Link
                                        onClick={() => setShowMenu(false)}
                                        href={'/'}
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start"
                                        role="menuitem"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        onClick={() => setShowMenu(false)}
                                        href={'/register'}
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start"
                                        role="menuitem"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>}
                        </div>
                    </div>}
                    <div className="justify-between items-center lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex font-medium flex-row lg:space-x-8 lg:mt-0">
                            <li className='flex gap-2 flex-col md:flex-row'>
                                <Link href="/" className="hidden lg:inline-block border p-1 rounded-md bg-blue-500 hover:bg-blue-300 text-white text-center">Home</Link>
                                {isLogin && <Link href="/question/ask" className="border p-1 rounded-md bg-blue-500 hover:bg-blue-300 text-white text-center">Add Quetions</Link>}
                            </li>
                        </ul>
                    </div>
                    {isLogin && <div className="flex items-center lg:order-2">
                        <div className="relative">
                            <div className="inline-flex items-center overflow-hidden border bg-blue-500 h-[40px] w-[40px] p-2 rounded-full cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
                                <span className="sr-only">Menu</span>
                                <svg height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <circle cx="256" cy="120.889" r="120.889"></circle> <path d="M412.444,512c31.418,0,56.889-25.471,56.889-56.889c0-117.82-95.514-213.333-213.333-213.333 S42.667,337.291,42.667,455.111c0,31.418,25.471,56.889,56.889,56.889H412.444z"></path> </g> <g> <polygon points="255.999,241.778 255.999,241.778 256,241.778 "></polygon> <path d="M376.889,120.889C376.889,54.124,322.765,0,256,0h-0.001v241.778H256 C322.765,241.778,376.889,187.654,376.889,120.889z"></path> <path d="M256,241.778L256,241.778L255.999,512h156.446c31.418,0,56.889-25.471,56.889-56.889 C469.333,337.291,373.82,241.778,256,241.778z"></path> </g> </g></svg>
                            </div>
                            {showProfile && <div
                                className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                                role="menu"
                            >
                                <div className="p-2">
                                    <Link
                                        onClick={() => setShowProfile(false)}
                                        href={'/profile'}
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start"
                                        role="menuitem"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handelClick}
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full text-start"
                                        role="menuitem"
                                    >
                                        Logout
                                    </button>

                                </div>
                            </div>}
                        </div>

                    </div>}
                </div>
            </nav>
        </header>
    )
}

export default Header