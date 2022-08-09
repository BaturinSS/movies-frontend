import './SearchForm.css';

import React from "react";

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import CheckboxSearch from '../SubstitutionCheckbox/CheckboxSearch/CheckboxSearch';

function SearchForm() {
  const performSearch = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <section className='search-form'>
        <form className='search-form__form'>
          <div className='search-form__search'>
            <input
              className='search-form__string'
              type='search'
              required={true}
              placeholder={`Фильм`}
            />
            <button
              className='search-form__button-submit'
              type='submit'
              onClick={performSearch}
            />
          </div>
          <FilterCheckbox
            label={'Короткометражки'}
            checked={false}>
            <CheckboxSearch/>
          </FilterCheckbox>
        </form>
      </section>
    </>
  )
}

export default SearchForm;