import './NotFound.css';

import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <>
      <section className='not-found'>
        <article className='not-found__block'>
          <h1 className='not-found__title'>404</h1>
          <p
            className='not-found__description'
          >
            Страница не найдена
          </p>
        </article>
        <button
          className='not-found__button-back'
          onClick={handleClick}
        >
          Назад
        </button>
      </section>
    </>
  );
}

export default NotFound;