import React from "react";
import { IconType } from "react-icons";

interface FormInputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: any;
    required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ id, type, placeholder, value, onChange, icon: Icon, required = false }) => {
    return (
        <div className="flex items-center font-medium text-sm mb-4 border rounded-full p-2 border-gray-300">
            <Icon className="text-teal-500 mr-3" />
            <input
                data-testid={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="flex-1 p-2 outline-none bg-transparent text-white"
            />
        </div>
    );
};

export default FormInput;
