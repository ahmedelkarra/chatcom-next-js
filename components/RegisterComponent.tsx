'use client'
import { fromAxios } from '@/axios/mainAxios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface IUser {
    fName: string;
    lName: string;
    email: string;
    username: string;
    pass: string;
    confirmPass: string;
}

function RegisterComponent() {
    const navigate = useRouter()
    const [valueInputs, setValueInputs] = useState<IUser>({ fName: '', lName: '', email: '', username: '', pass: '', confirmPass: '' })
    const [errorText, setErrorText] = useState<string>('')
    const [successText, setSuccessText] = useState<string>('')

    const handelSubmit = () => {
        if (valueInputs.fName && valueInputs.lName && valueInputs.email && valueInputs.username && valueInputs.pass && valueInputs.pass === valueInputs.confirmPass) {
            fromAxios.post('/register', valueInputs)
                .then((e) => {
                    setErrorText('')
                    setSuccessText(e?.data?.message)
                    setTimeout(() => {
                        setSuccessText('')
                        navigate.push('/login')
                    }, 3000)
                })
                .catch((err) => {
                    setErrorText(err?.response?.data?.message)
                    setTimeout(() => {
                        setErrorText('')
                    }, 4000)
                })
        } else if (valueInputs.pass !== valueInputs.confirmPass) {
            setErrorText('Your password not match')
        } else {
            setErrorText('Please check your inputs')
        }
    }
    return (
        <div className='flex flex-col justify-around items-center border my-4 gap-2 md:h-[60dvh] w-[90%] md:w-[70%] mx-auto rounded-md shadow-md'>
            <div className='flex flex-col justify-center items-center w-[90%]'>
                <div className='bg-blue-400 w-14 h-14 p-3 rounded-full my-3' >
                    <svg fill="#ffffff" height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330.00 330.00" stroke="#ffffff" strokeWidth="0.0033"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_">
                        <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path>
                    </g>
                    </g>
                    </svg>
                </div>
                {errorText && <h2 className='border p-2 w-[90%] md:w-[80%] text-center text-[20px]  rounded-md bg-red-500 my-3 text-white'>{errorText}</h2>}
                {successText && <h2 className='border p-2 w-[90%] md:w-[80%] text-center text-[20px]  rounded-md bg-green-500 my-3 text-white capitalize'>{successText}</h2>}
                <h2 className='border p-2 w-[70%] md:w-[50%] text-center text-[20px] rounded-md bg-blue-300 text-white'>Register Page</h2>
            </div>
            <div className='grid grid-cols-12 w-[90%] gap-2'>
                <input type="text" className='w-full border p-4 rounded-md col-span-6' placeholder='First Name' onChange={(e) => setValueInputs({ ...valueInputs, fName: e.target.value })} maxLength={20} required />
                <input type="text" className='w-full border p-4 rounded-md col-span-6' placeholder='Last Name' onChange={(e) => setValueInputs({ ...valueInputs, lName: e.target.value })} maxLength={20} required />
                <input type="text" className='w-full border p-4 rounded-md col-span-12' placeholder='Username' onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} maxLength={20} required />
                <input type="email" className='w-full border p-4 rounded-md col-span-12' placeholder='Email' onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} maxLength={30} required />
                <input type="password" className='w-full border p-4 rounded-md col-span-12 md:col-span-6' placeholder='Password' onChange={(e) => setValueInputs({ ...valueInputs, pass: e.target.value })} required />
                <input type="password" className='w-full border p-4 rounded-md col-span-12 md:col-span-6' placeholder='Confirm Password' onChange={(e) => setValueInputs({ ...valueInputs, confirmPass: e.target.value })} required />
            </div>
            <div className='flex flex-col w-[90%] items-center'>
                <button className='border p-3 rounded-md my-4 w-full bg-blue-500 active:bg-blue-400 text-white' onClick={handelSubmit}>Submit</button>
                <Link href={'/login'} className='underline hover:text-gray-400 text-gray-600 my-2'>Do Have Account? Login Here</Link>
            </div>
        </div>
    )
}

export default RegisterComponent
