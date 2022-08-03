import './MainAuthentication.css';

import Form from '../../Form/Form';

function MainAuthentication({
  onSubmitForm,
  isEmail,
  setIsEmail,
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
          isEmail={isEmail}
          setIsEmail={setIsEmail}
        />
      </section>
    </>
  )
}

export default MainAuthentication;