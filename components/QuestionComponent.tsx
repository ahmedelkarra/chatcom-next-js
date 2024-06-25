'use client';
import React, { useContext, useState } from 'react';
import AnswersComponent from './AnswersComponent';
import QuillEditor from './QuillEditor';
import { AnswersInfo } from '@/context/AnswersInfo';
import { useParams } from 'next/navigation';
import { QuestionsInfo } from '@/context/QuestionsInfo';
import parse from 'html-react-parser';
import { mainAxios } from '@/axios/mainAxios';
import { getCookie } from 'cookies-next';
import { IsChanged } from '@/context/IsChanged';

interface Answer {
    _id: string;
    question: string;
    // other answer properties
}

interface Question {
    _id: string;
    title: string;
    body: string;
    descriptions: string[];
}

function QuestionComponent() {
    const answersInfoContext = useContext(AnswersInfo);
    const questionsInfoContext = useContext(QuestionsInfo);
    const isChangedContext = useContext(IsChanged)

    if (!isChangedContext) {
        throw new Error('This faild must be boolean')
    }
    if (!answersInfoContext) {
        throw new Error('This must be used within an AnswersInfo provider');
    }
    if (!questionsInfoContext) {
        throw new Error('This must be used within a QuestionsInfo provider');
    }
    const { isChanged, setIsChanged } = isChangedContext
    const { questionsInfo } = questionsInfoContext;
    const { answersInfo } = answersInfoContext;
    const param = useParams();
    const [editorContent, setEditorContent] = useState<string>('');

    const handleSubmit = () => {
        mainAxios.post('/answers', { title: editorContent, questionId: param.id }, { headers: { Authorization: getCookie('token') } })
            .then((e) => {
                setEditorContent('')
                setIsChanged(true)
                console.log(e?.data?.message)
            })
            .catch((err) => {
                console.log(err?.response?.data?.message)
            })
        console.log({ body: editorContent, question: param.id });
    };

    const handleLikes = (actionLike: string) => {
        mainAxios.put(`/questions/${param?.id}`, { likeAction: actionLike }, { headers: { Authorization: getCookie('token') } })
            .then((e) => {
                setIsChanged(true)
                console.log(e?.data?.message)
            })
            .catch((err) => {
                console.log(err?.response?.data?.message)
            })
    }

    const getAllAnswers = answersInfo?.filter((ele: Answer) => ele?.question === param?.id)
    const getDescriptions = questionsInfo.find((ele: Question) => ele?._id === param?.id)
    const handleLength = () => {
        const likesCount = getDescriptions?.likes?.length || 0
        const dislikesCount = getDescriptions?.dislike?.length || 0;
        let totalVotes = likesCount - dislikesCount;
        if (totalVotes < 0) {
            totalVotes = 0
        }
        return totalVotes
    }
    return (
        <div className='container mx-auto my-5'>
            <div className='grid grid-cols-12 m-5 p-3 gap-5 border rounded-md'>
                <div className='col-span-4 md:col-span-2 flex flex-col justify-center items-center gap-5'>
                    <h2 className='flex justify-center items-center w-[50px] h-[50px] p-2 border bg-slate-300 text-white rounded-full text-[20px] uppercase'>{getDescriptions?.fName[0]}{getDescriptions?.lName[0]}</h2>

                    <h2 className='border rounded-md p-2 capitalize text-center'>{getDescriptions?.fName} {getDescriptions?.lName}</h2>
                    <div className='flex flex-col justify-center items-center'>
                        <button className='w-[30px] h-[30px]' onClick={() => handleLikes('plus')}>
                            <svg className='w-[100%]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#008000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#008000"></path>
                                </g>
                            </svg>
                        </button>
                        <h2 className='text-[20px]'>{handleLength()}</h2>
                        <button className='w-[30px] h-[30px]' onClick={() => handleLikes('minus')}>
                            <svg className='w-[100%]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF0000" transform="matrix(1, 0, 0, -1, 0, 0)">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#FF0000"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='col-span-8 md:col-span-10 flex flex-col justify-start items-start'>
                    <h2 className='text-[20px]'>{getDescriptions?.title}</h2>
                    <div className='my-5'>{parse(getDescriptions?.body?.toString() || '')}</div>
                    <div className='my-10 flex flex-wrap gap-1'>
                        {getDescriptions?.descriptions.map((ele, index) => (
                            <h3 key={index} className='bg-blue-300 text-white py-1 px-2 rounded-full'>{ele}</h3>
                        ))}
                    </div>
                </div>
            </div>
            <h2 className='border flex justify-center items-center m-5 p-2 md:w-[200px] rounded-md'>Answers</h2>
            <div className='max-h-[60dvh] mt-5 mb-10 overflow-auto'>
                {getAllAnswers?.map((ele) => (
                    <AnswersComponent key={ele._id} data={ele} />
                ))}
            </div>

            <div className='flex flex-col justify-center items-start mx-2 md:mx-5'>
                <div className='w-full h-[40vh]'>
                    <QuillEditor value={editorContent} onChange={setEditorContent} />
                </div>
                <button onClick={handleSubmit} className='border p-2 rounded-md bg-green-500 text-white'>
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export default QuestionComponent;
