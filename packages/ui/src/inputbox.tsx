import React from "react";
interface inputProp {
  label?: string;
  placeholder?: string;
  className?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Inputbox = ({
  label,
  placeholder,
  className,
  onChange,
  type,
  ...props
}: inputProp): React.JSX.Element => {
  return (
    <div>
      {label && <label className="text-lg font-semibold">{label}:</label>}
      <input
        type={type}
        className={`${className} rounded-xl py-1 px-3 ml-4 mb-4 border-2 border-black `}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
