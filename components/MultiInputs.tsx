import { useState, useEffect } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';

export interface Option {
    value: string;
    label: string;
}

const options: Option[] = [
    { value: 'programming', label: 'Programming' },
    { value: 'next.js', label: 'Next.Js' },
    { value: 'react.js', label: 'React.Js' },
    { value: 'node.js', label: 'Node.Js' },
    { value: 'django', label: 'Django' },
    { value: 'python', label: 'Python' },
];

interface QuillEditorProps {
    value: Option[];
    onChange: (content: Option[]) => void;
}

const MultiSelect: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(value);

    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    const handleChange = (selected: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        const selectedOptionsArray = selected as Option[];
        onChange(selectedOptionsArray);
        setSelectedOptions(selectedOptionsArray);
    };

    return (
        <div className="col-span-12 w-full my-2 mx-auto p-6 bg-white rounded-lg shadow-md">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="multi-select">
                Descriptions
            </label>
            <Select
                inputId="multi-select"
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                options={options}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                    control: (provided) => ({
                        ...provided,
                        width: '100%',
                    }),
                }}
            />
        </div>
    );
};

export default MultiSelect;
