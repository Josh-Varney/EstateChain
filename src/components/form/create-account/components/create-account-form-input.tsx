import React from "react";
import { IconType } from "react-icons";

interface FormInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: IconType;
    required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, value, onChange, icon: Icon, required = false }) => {
    return (
        <div className="flex items-center font-medium text-sm mb-4 border rounded-full p-2 border-gray-300">
            <Icon className="text-gray-600 mr-3" />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="flex-1 p-2 outline-none bg-transparent"
            />
        </div>
    );
};

export default FormInput;