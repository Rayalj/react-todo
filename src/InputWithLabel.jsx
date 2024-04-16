// /src/InputWithLabel.jsx

import React, { useEffect, useRef } from 'react';

const InputWithLabel = ({ children, value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input 
        type="text" 
        id="todoTitle" 
        name="title" 
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
}

export default InputWithLabel;