'use client'
import { IAnswers } from '@/context/AnswersInfo'
import React, { useContext } from 'react'
import parse from 'html-react-parser'
import { IsLogin } from '@/context/IsLogin'
import { useParams, useRouter } from 'next/navigation'
import TimeAgo from './TimeCounter'
import { mainAxios } from '@/axios/mainAxios'
import { getCookie } from 'cookies-next'
import { IsChanged } from '@/context/IsChanged'
import Lable from './Lable'

function AnswersComponent({ data }: { data: IAnswers }) {
    const loginContext = useContext(IsLogin)
    const isChangedContext = useContext(IsChanged)

    if (!isChangedContext) {
        throw new Error('This faild must be boolean')
    }
    if (!loginContext) {
        throw new Error('This faild must be only boolean')
    }
    const { isChanged, setIsChanged } = isChangedContext
    const { isLogin, setIsLogin } = loginContext
    const router = useRouter()
    const param = useParams();

    const handleLikes = (actionLike: string) => {
        mainAxios.put(`/answers/${param?.id}`, { likeAction: actionLike }, { headers: { Authorization: getCookie('token') } })
            .then((e) => {
                setIsChanged(true)
                console.log(e?.data?.message)
            })
            .catch((err) => {
                console.log(err?.response?.data?.message)
            })
    }

    const handleLength = () => {
        const likesCount = data?.likes?.length || 0
        const dislikesCount = data?.dislike?.length || 0;
        let totalVotes = likesCount - dislikesCount;
        if (totalVotes < 0) {
            totalVotes = 0
        }
        return totalVotes
    }
    return isLogin ? (
        <div className='border m-5 p-2 rounded-md min-h-[180px]'>
            <div className='flex items-center justify-between mx-2 my-4'>
                <div className='flex justify-center items-center gap-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <button className='w-[30px] h-[30px]' onClick={() => handleLikes('plus')}>
                            <svg className='w-[100%]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#008000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#008000"></path> </g></svg>
                        </button>
                        <h2 className='text-[20px]'>{handleLength()}</h2>
                        <button className='w-[30px] h-[30px]' onClick={() => handleLikes('minus')}>
                            <svg className='w-[100%]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF0000" transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#FF0000"></path> </g></svg>
                        </button>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <h2 className='flex justify-center items-center w-[50px] h-[50px] p-2 bg-slate-300 text-white rounded-full text-[20px] uppercase'>{data?.fName[0]}{data?.lName[0]}</h2>
                        <h2 className='border rounded-md p-2 capitalize text-center'>{data?.fName} {data?.lName}</h2>
                    </div>
                </div>
                <TimeAgo date={data?.createdAt} />
            </div>
            <div className='text-center'>{parse(data?.title || '')}</div>
        </div>
    )
        :
        (
            <Lable />
        )
}

export default AnswersComponent