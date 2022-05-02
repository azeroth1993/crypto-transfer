import React, { useState, useEffect } from "react"

interface Input {
  type?: string,
  className?: string,
  label: string,
  id: string,
  placeholder?: string,
  pattern?: string,
  value?: string | number | undefined,
  step?: string,
  min?: number,
  required?: boolean,
  onInput?: any,
}

const Input: React.FunctionComponent<Input> = ({ type = 'text', label, id, className, placeholder, pattern, required, value = '', step, min, onInput }) => {

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e);
  }

  return (
    <div className={`block w-full mb-7 ${className}`}>
      <label htmlFor={id} className="block capitalize mb-1 w-full">{label}</label>
      <input 
        id={id}
        type={type} 
        placeholder={placeholder}
        pattern={pattern}
        required={required}
        value={value}
        step={step}
        className="block w-full h-10 border-b-2 border-primary outline-none capitalize bg-white"
        onChange={handleInput}
      />
    </div>
  )
}
export default Input

