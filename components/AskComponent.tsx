'use client';
import React, { useContext, useState } from 'react';
import QuillEditor from './QuillEditor';
import MultiInputs, { Option } from './MultiInputs';
import { mainAxios } from '@/axios/mainAxios';
import { getCookie } from 'cookies-next';
import { IsChanged } from '@/context/IsChanged';
import { useRouter } from 'next/navigation';

interface IValueInputs {
    title: string;
    body: string;
    descriptions: string[]; // Update to string[] to hold only the values
}

const options: Option[] = [
    { value: 'programming', label: 'Programming' },
    { value: 'next.js', label: 'Next.Js' },
    { value: 'react.js', label: 'React.Js' },
    { value: 'node.js', label: 'Node.Js' },
    { value: 'django', label: 'Django' },
    { value: 'python', label: 'Python' },
];

function AskComponent() {
    const isChangedContext = useContext(IsChanged)

    if (!isChangedContext) {
        throw new Error('This faild must be boolean')
    }
    const { isChanged, setIsChanged } = isChangedContext
    const [valueInputs, setValueInputs] = useState<IValueInputs>({
        title: "",
        body: "",
        descriptions: []
    });
    const router = useRouter()
    const [editorContent, setEditorContent] = useState<string>('');

    const handleSubmit = () => {
        mainAxios.post('/questions', { title: valueInputs.title, body: editorContent, descriptions: valueInputs.descriptions }, { headers: { Authorization: getCookie('token') } })
            .then((e) => {
                setIsChanged(true)
                router.push('/')
                console.log(e?.data?.message)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log({
            title: valueInputs.title,
            body: editorContent,
            descriptions: valueInputs.descriptions,
        });
    };

    const handleDescriptionsChange = (selectedOptions: Option[]) => {
        const selectedValues = selectedOptions.map((option: Option) => option.value);
        setValueInputs({
            ...valueInputs,
            descriptions: selectedValues
        });
    };

    return (
        <div className='container p-2 md:mx-auto grid grid-cols-12'>
            <label
                htmlFor="Title"
                className="col-span-12 my-2 p-4 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <input
                    required
                    type="text"
                    id="Title"
                    value={valueInputs.title}
                    onChange={(e) => setValueInputs({ ...valueInputs, title: e.target.value })}
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Title"
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Title
                </span>
            </label>

            <MultiInputs
                onChange={handleDescriptionsChange}
                value={options.filter(option => valueInputs.descriptions.includes(option.value))}
            />

            <div className='col-span-12 w-full h-[40vh] my-2'>
                <QuillEditor value={editorContent} onChange={setEditorContent} />
            </div>

            <button onClick={handleSubmit} className='col-span-12 border p-2 rounded-md bg-green-500 text-white'>
                Add Comment
            </button>
        </div>
    );
}

export default AskComponent;
