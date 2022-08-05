import React from "react";

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Form from '../../components/Form/Form';
import FormInput from '../../components/FormInput/FormInput';
import FormSubmit from '../../components/FormSubmit/FormSubmit';

import configFormSubmitAuth from '../../components/utils/config/formSubmit/configFormSubmitAuth';
import configFormInputPassword from '../../components/utils/config/formInput/configFormInputPassword';
import configFormInputEmail from '../../components/utils/config/formInput/configFormInputEmail';
import configFormAuth from '../../components/utils/config/form/configFormAuth';

import { textMessageError, textGreetingsLogin } from '../../components/utils/constants'

function AuthenticationPage({
  isLoggedIn, isEmail,
  onSubmitForm, handleEmailChange,
}) {
  return (
    <>
      <Header modifier={'header_auth'}>
        {!isLoggedIn && <HeaderAuth
          textGreetings={textGreetingsLogin}
        />}
      </Header>
      <Main>
        <Form
          config={configFormAuth}
          onSubmitForm={onSubmitForm}
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
            modifier={'form__block_auth'}
            textMessageError={textMessageError}
          />
        </Form>
      </Main>
    </>
  );
}

export default AuthenticationPage;