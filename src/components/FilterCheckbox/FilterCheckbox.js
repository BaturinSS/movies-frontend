import './FilterCheckbox.css';

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
        <span className='checkbox__new' />
      </label>
    </>
  )
}

export default FilterCheckbox;
