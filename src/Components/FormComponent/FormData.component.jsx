import React from "react";

const FormDataComponent = ({
  name,
  type,
  label,
  placeholder = "",
  onChange,
  deliveryCheck =false
}) => {
  return (
    <div className="  w-full space-y-3 mb-5 ">
      <label className="mt-4 xs:text-sm text-md   tracking-wide " htmlFor={name}>
        {label}
      </label>
      <input
        className="  text-gray-800 focus:ring-blue-500 focus:outline-none focus:ring-1   w-full  border p-2 rounded-lg mb-0  focus:border-0  "
        type={type}
        required
        onChange={onChange}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormDataComponent;
