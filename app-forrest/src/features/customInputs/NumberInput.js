import React, { useState } from 'react';
import './styles.css';

export default function NumberImput({ type = 'number', label , changeCallback}) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if(typeof changeCallback === "function"){
      changeCallback(e.target.value);
    }
  }

  return (
    <div className="input-container">
      <input type={type} value={value} onChange={handleChange} />
      <label className={value && 'filled'} htmlFor={value}>
        {label}
      </label>
    </div>
  );
}