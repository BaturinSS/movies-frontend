import './SearchForm.css';

import React from "react";

import Checkbox from '../Checkbox/Checkbox'

function SearchForm() {
  return (
    <>
      <section className='search-form'>
        <form className='search-form__form'>
          <div className='search-form__search'>
            <input
              className='search-form__string'
              type='search'
              placeholder={`Фильм`}
            />
            <button
              className='search-form__button-submit'
              type='submit'
            />
          </div>
          <Checkbox
            label={'Короткометражки'}
            value={true}
            checked={false}
          />
        </form>
      </section>
    </>
  )
}

export default SearchForm;