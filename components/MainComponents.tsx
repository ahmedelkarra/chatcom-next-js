'use client'
import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import Link from 'next/link';
import { IQuestions, QuestionsInfo } from '@/context/QuestionsInfo';
import { IsLogin } from '@/context/IsLogin';
import { useRouter } from 'next/navigation';
import Lable from './Lable';


function MainComponents() {
    const questionsInfoContext = useContext(QuestionsInfo)
    const loginContext = useContext(IsLogin)

    if (!loginContext) {
        throw new Error('This faild must be only boolean')
    }
    if (!questionsInfoContext) {
        throw new Error('This must be as IQuestions')
    }
    const { isLogin, setIsLogin } = loginContext
    const { questionsInfo, setQuestionsInfo } = questionsInfoContext
    const [sortedQuestions, setSortedQuestions] = useState<IQuestions[]>(questionsInfo);

    const sortByNewest = () => {
        const sorted = [...questionsInfo].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setSortedQuestions(sorted);
    };

    const sortByOldest = () => {
        const sorted = [...questionsInfo].sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        setSortedQuestions(sorted);
    };
    useEffect(() => {
        setSortedQuestions(questionsInfo)
    }, [questionsInfo])
    return isLogin ? (
        <div className='h-[75dvh] my-3 px-5 md:px-0 overflow-y-auto'>
            <div className='flex container mx-auto my-5'>
                <button onClick={sortByNewest} className='border p-2 w-[80px] text-center hover:bg-blue-300 hover:text-white cursor-pointer rounded-l'>Newest</button>
                <button onClick={sortByOldest} className='border p-2 w-[80px] text-center hover:bg-blue-300 hover:text-white cursor-pointer rounded-r'>Oldest</button>
            </div>

            {sortedQuestions?.map((e) => {
                return (
                    <Post key={e?._id} data={e} />
                )
            })}
        </div>
    ) : (
        <div className='text-center mt-4'>
            <Lable />
        </div>
    );

}

export default MainComponents