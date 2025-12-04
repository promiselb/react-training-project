import React from 'react'
import { useState, useEffect } from 'react'
import useDebounce from '../hooks/useDebounce'

const Searchbar = ({
  value,
  delay = 400, 
  placeholder = "Search...", 
  spanText = "",
  onChange, 
  onDebounce,
  divStyle,
  inputStyle,
  spanStyle }) => {

  const [inputValue, setInputValue] = useState(value);
  const debouncedTerm = useDebounce(inputValue, delay);

  useEffect( () => {
    if (!onDebounce || typeof onDebounce !== "function") {
      console.warn("Searchbar component requires a valid 'onDebounce' function prop.");
      return;
    }

    onDebounce(debouncedTerm);
  }, [debouncedTerm, onDebounce]);

  const handleInputChange = (e) => {  
    setInputValue(e.target.value);
    if (typeof onChange === "function") {
      onChange(e.target.value); // immediate callback
    }
  }

  return (
    <>
    <div className={divStyle}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={inputStyle}
      />
      <span className={spanStyle} >{spanText}</span>
    </div>
    </>
  )
}

export default Searchbar