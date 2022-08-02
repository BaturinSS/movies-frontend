import './MainRegistration.css';

import Form from '../../Form/Form';

function MainRegistration({
  onSubmitForm,
}) {
  const idForm = 'formRegistration'
  return (
    <>
      <section className={`main`}>
        <Form
          idForm={`${idForm}`}
          onSubmitForm={onSubmitForm}
          textButton={`Зарегистрироваться`}
          textQuestion={`Уже зарегистрированы?`}
          textLink={`Войти`}
          pathLink={`/sign-in`}
        />
      </section>
    </>
  )
}

export default MainRegistration;