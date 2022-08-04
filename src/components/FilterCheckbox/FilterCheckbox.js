import React from "react";

import './FilterCheckbox.css';

import CheckboxSearch from '../SubstitutionCheckbox/CheckboxSearch/CheckboxSearch';

function FilterCheckbox({
  value,
  checked,
  label,
}) {
  return (
    <>
      <label
        className='checkbox'
        htmlFor='filterCheckbox'
      >
        <input
          className='checkbox__input'
          id='filterCheckbox'
          type='checkbox'
          value={value}
          defaultChecked={checked}
        />
        {label}
        <CheckboxSearch />
      </label>
    </>
  )
}

export default FilterCheckbox;
