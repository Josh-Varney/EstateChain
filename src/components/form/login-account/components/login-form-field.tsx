import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

interface FormFieldProps {
  icon: "user" | "lock";
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ icon, type, placeholder, value, onChange }) => {
  const Icon = icon === "user" ? FaUser : FaLock;

  return (
    <div className="flex items-center font-medium text-sm mb-4 border rounded-full p-2 border-white">
      <Icon className="text-teal-400 mr-3" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="flex-1 p-2 outline-none bg-transparent text-white"
      />
    </div>
  );
};

export default FormField;
