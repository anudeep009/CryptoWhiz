import React, { useState, useEffect } from 'react';

const Dropdown = () => {
  const [selected, setSelected] = useState('USD');
  const [isOpen, setIsOpen] = useState(false);
  const options = ['USD', 'INR', 'YEN'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="relative inline-block text-left font-mono">
      <div
        className="flex items-center justify-between px-4 py-2 text-black border border-black rounded-md shadow-sm cursor-pointer select-none bg-white"
        onClick={toggleDropdown}
      >
        <span className="block truncate">{selected}</span>
        <svg
          className={`transform ${isOpen ? 'rotate-180' : ''} ml-2 h-5 w-5`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v10.586l3.707-3.707a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 14.586V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-36 mt-1 text-black border border-black rounded-md shadow-lg bg-white">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                option === selected ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
