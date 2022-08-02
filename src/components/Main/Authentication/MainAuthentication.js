import './MainAuthentication.css';

import Form from '../../Form/Form';

function MainAuthentication({
  onSubmitForm,
}) {
  const idForm = 'formAuth'
  return (
    <>
      <section className={`main`}>
        <Form
          idForm={`${idForm}`}
          onSubmitForm={onSubmitForm}
          textButton={`Войти`}
          textQuestion={`Ещё не зарегистрированы?`}
          textLink={`Регистрация`}
          pathLink={`/sign-up`}
        />
      </section>
    </>
  )
}

export default MainAuthentication;