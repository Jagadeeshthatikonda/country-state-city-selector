import React from 'react';

const Select = ({ id, value, onChange, disabled, placeholder, options }) => {
  return (
    <div>
      <select id={id} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
