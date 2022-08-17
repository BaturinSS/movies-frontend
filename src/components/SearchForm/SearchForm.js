import './SearchForm.css';

import React from "react";

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import CheckboxSearch from '../SubstitutionCheckbox/CheckboxSearch/CheckboxSearch';

function SearchForm({ clickSubmitButton, nameForm }) {
  const refForm = React.useRef();

  const handleClickCheckbox = () => {
    clickSubmitButton(refForm.current);
  }

  return (
    <>
      <section className='search-form'>
        <form className='search-form__form'
          ref={refForm}
          noValidate
          name={nameForm}
        >
          <div className='search-form__search'>
            <input
              className='search-form__string'
              type='search'
              name='searchQuery'
              onChange={handleClickCheckbox}
              required={true}
              placeholder={`Фильм`}
            />
            <button
              className='search-form__button-submit'
              type='submit'
              name='buttonSubmit'
              onClick={clickSubmitButton}
            />
          </div>
          <FilterCheckbox
            onClick={handleClickCheckbox}
            label={'Короткометражки'}
            checked={false}>
            <CheckboxSearch />
          </FilterCheckbox>
        </form>
      </section>
    </>
  )
}

export default SearchForm;