import React from "react";

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

import Form from '../../components/Form/Form';
import FormInput from '../../components/FormInput/FormInput';
import FormSubmit from '../../components/FormSubmit/FormSubmit';

import configFormLogin from '../../components/utils/config/form/configFormLogin';
import configFormSubmitLogin from '../../components/utils/config/formSubmit/configFormSubmitLogin';
import configFormInputEmail from '../../components/utils/config/formInput/configFormInputEmail';
import configFormInputPassword from '../../components/utils/config/formInput/configFormInputPassword';
import configFormInputName from '../../components/utils/config/formInput/configFormInputName';

function RegistrationPage({
  textMessageError,
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
  onSubmitForm,
  isEmail,
  setIsEmail,
  isName,
  setIsName,
}) {
  const handleNameChange = (event) => {
    setIsName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setIsEmail(event.target.value);
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
        textGreetings={`Добро пожаловать!`}
      />
      <Main>
        <Form
          config={configFormLogin}
          onSubmitForm={onSubmitForm}
        >
          <FormInput
            config={configFormInputName}
            onChange={handleNameChange}
            value={isName}
          />
          <FormInput
            config={configFormInputEmail}
            onChange={handleEmailChange}
            value={isEmail}
          />
          <FormInput
            config={configFormInputPassword}
            textMessageError={textMessageError}
          />
          <FormSubmit
            config={configFormSubmitLogin}
            classNameBlock={''}
            textMessageError={textMessageError}
          />
        </Form>
      </Main>
    </>
  );
}

export default RegistrationPage;