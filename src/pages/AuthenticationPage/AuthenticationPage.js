import React from "react";

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Form from '../../components/Form/Form';
import FormInput from '../../components/FormInput/FormInput';
import FormSubmit from '../../components/FormSubmit/FormSubmit';

import configFormSubmitAuth from '../../components/utils/config/formSubmit/configFormSubmitAuth';
import configFormInputPassword from '../../components/utils/config/formInput/configFormInputPassword';
import configFormInputEmail from '../../components/utils/config/formInput/configFormInputEmail';
import configFormAuth from '../../components/utils/config/form/configFormAuth';

function AuthenticationPage({
  textMessageError,
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
  onSubmitForm,
  isEmail,
  setIsEmail,
}) {
  const handleEmailChange = (event) => {
    setIsEmail(event.target.value);
  }

  return (
    <>
      <Header
        textGreetings={'Рады видеть!'}
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <Main>
        <Form
          config={configFormAuth}
          onSubmitForm={onSubmitForm}
          isEmail={isEmail}
          setIsEmail={setIsEmail}
        >
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
            config={configFormSubmitAuth}
            classNameBlock={'form__block_auth'}
            textMessageError={textMessageError}
          />
        </Form>
      </Main>
    </>
  );
}

export default AuthenticationPage;