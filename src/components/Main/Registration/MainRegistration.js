import './MainRegistration.css';

import Form from '../../Form/Form';

function MainRegistration({
  onSubmitForm,
  isEmail,
  setIsEmail,
  isName,
  setIsName,
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
          isEmail={isEmail}
          setIsEmail={setIsEmail}
          isName={isName}
          setIsName={setIsName}
        />
      </section>
    </>
  )
}

export default MainRegistration;