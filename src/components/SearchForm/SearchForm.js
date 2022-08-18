import './SearchForm.css';
import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import CheckboxSearch from '../SubstitutionCheckbox/CheckboxSearch/CheckboxSearch';

function SearchForm({ clickSubmitButton, nameForm, configMovies }) {
  const refForm = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      const arrElForm = Array.from(refForm.current);
      arrElForm[0].value = configMovies.searchQuery;
      arrElForm[2].checked = configMovies.filter;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickCheckbox = () => {
    clickSubmitButton(refForm.current);
  }

  const onChangeMoviesSaved = () => {
    if (location.pathname === '/saved-movies')
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
              onChange={onChangeMoviesSaved}
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