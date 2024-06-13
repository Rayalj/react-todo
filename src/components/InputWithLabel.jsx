import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import './InputWithLabel.css'; // Asegúrate de que esta ruta sea correcta

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
        placeholder='Enter a new task'
        id="todoTitle" 
        name="title" 
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
};

InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
