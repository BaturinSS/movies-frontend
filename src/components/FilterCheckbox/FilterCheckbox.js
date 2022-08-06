import './FilterCheckbox.css';

import React from "react";

function FilterCheckbox({
  value, children,
  checked,
  label,
}) {
  return (
    <>
      <label
        className='checkbox'
        htmlFor='filterCheckbox'>
        <input
          className='checkbox__input'
          id='filterCheckbox'
          type='checkbox'
          value={value}
          defaultChecked={checked} />
        {label}
        {children}
      </label>
    </>
  )
}

export default FilterCheckbox;
