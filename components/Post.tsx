import { AnswersInfo } from '@/context/AnswersInfo';
import { IQuestions } from '@/context/QuestionsInfo'
import Link from 'next/link'
import React, { useContext } from 'react'
import TimeAgo from './TimeCounter';


function Post({ data }: { data: IQuestions }) {
    const answersInfoContext = useContext(AnswersInfo);

    if (!answersInfoContext) {
        throw new Error('This must be used within an AnswersInfo provider');
    }
    const { answersInfo } = answersInfoContext;
    const getLength = answersInfo.filter((e) => e?.question === data?._id)
    return (
        <div className='container mx-auto'>
            <Link href={`/question/${data._id}`} className='flex justify-center items-center gap-5 md:mx-auto my-10'>
                <h2 className='bg-blue-300 p-4 my-4 text-white rounded-md'>{getLength.length}</h2>
                <div className='border-b flex flex-col justify-evenly items-center w-[100%] md:w-[70%] lg:w-[50%]'>
                    <h2 className='my-4 text-[20px]'>{data.title}</h2>
                    <div className='grid grid-cols-12 justify-center items-center'>
                        <div className='col-span-6 md:col-span-10 flex gap-2 flex-wrap mb-10 mt-4'>
                            {data.descriptions?.map((e, index) => {
                                return (
                                    <h3 key={index} className='bg-blue-300 text-white py-1 px-2 rounded-full'>{e}</h3>
                                )
                            })}
                        </div>
                        <h2 className='col-span-6 md:col-span-2 bg-blue-300 text-white rounded-md py-1 md:px-2 text-center min-w-[120px] md:w-[150px]'><TimeAgo date={data?.createdAt} /></h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Post