import './FilterCheckbox.css';
import React from "react";

function FilterCheckbox({
  value,
  children,
  checked,
  label,
  onClick,
}) {

  return (
    <>
      <label
        className='checkbox'
        htmlFor='filterCheckbox'>
        <input className='checkbox__input'
          id='filterCheckbox'
          type='checkbox'
          name='filter'
          onClick={onClick}
          value={value}
          defaultChecked={checked} />
        {label}
        {children}
      </label>
    </>
  )
}

export default FilterCheckbox;
