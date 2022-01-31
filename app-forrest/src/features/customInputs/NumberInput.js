import React, { useState } from 'react';
import './styles.css';

export default function TextInput({ type = 'number', label }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
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