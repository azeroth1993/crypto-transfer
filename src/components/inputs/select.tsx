import React, { useState, useEffect } from "react"

interface Input {
  className?: string,
  label: string,
  id: string,
  placeholder?: string,
  onSelect?: any,
  options: {}[],
}

const Input: React.FunctionComponent<Input> = ({ label, id, className, placeholder, options, onSelect }) => {

  // const [isOpen, setIsOpen] = useState(open)

  // const closeModal = () => {
  //   setIsOpen(false);
  //   onClose();
  // }

  // useEffect(() => {
  //   toggleModal(open);
  // }, [open])

  return (
    <div className={`block w-full mb-7 ${className}`}>
      <label htmlFor={id} className="block capitalize mb-1 w-full">{label}</label>
      <select 
        id={id}
        placeholder={placeholder}
        className="block w-full h-10 border-b-2 border-primary outline-none capitalize bg-white"
        onChange={onSelect}
      >
        {options.map((x: any) => (
          <option key={x} value={x} className="capitalize">{x}</option>
        ))}
      </select>
    </div>
  )
}
export default Input

