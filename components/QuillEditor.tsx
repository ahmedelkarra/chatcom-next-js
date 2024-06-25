import dynamic from 'next/dynamic';
import { FC } from 'react';
import 'quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'blockquote': true }, { 'code-block': true }]
        ]
    };

    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'blockquote', 'code-block'
    ];

    return (
        <QuillNoSSRWrapper
            className='h-[30vh]'
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            theme="snow"
        />
    );
};

export default QuillEditor;
