import React from "react";
interface selectProps {
  name: string;
  options: string[];
  label?: string;
  className?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const Selectbox = ({
  name,
  options,
  label,
  className,
  onChangeHandler,
}: selectProps) => {
  return (
    <div>
      {label && <label className="font-semibold text-lg">{label}</label>}
      <select
        name={name}
        className={`ml-2 p-2 border-2 border-black rounded-xl mb-4 ${className}`}
        onChange={onChangeHandler}
      >
        {options &&
          options.map((field, index) => {
            return (
              <option value={field} key={index}>
                {field}
              </option>
            );
          })}
      </select>
    </div>
  );
};
