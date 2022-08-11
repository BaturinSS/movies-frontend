import React from "react";

import Header from "../../components/Header/Header";

import Main from "../../components/Main/Main";

import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";

import Form from "../../components/Form/Form";
import configFormLogin from "../../components/utils/config/form/configFormLogin";

import FormInput from "../../components/FormInput/FormInput";
import configFormInputEmail from "../../components/utils/config/formInput/configFormInputEmail";
import configFormInputPassword from "../../components/utils/config/formInput/configFormInputPassword";
import configFormInputName from "../../components/utils/config/formInput/configFormInputName";

import FormSubmit from "../../components/FormSubmit/FormSubmit";
import configFormSubmitLogin from "../../components/utils/config/formSubmit/configFormSubmitLogin";

import { textMessageError } from "../../components/utils/constants";

import useAuth from "../../components/utils/hooks/useAuth";

function RegistrationPage({
  isEmail, isName,
  handleEmailChange,
  handleNameChange,
}) {
  const { errors, isValid, onChange, onSubmitForm } = useAuth();

  return (
    <>
      <Header modifier={'header_auth'}>
        <HeaderAuth textGreetings={'Добро пожаловать!'} />
      </Header>
      <Main>
        <Form
          config={configFormLogin}
          onSubmitForm={onSubmitForm}
        >
          <FormInput
            config={configFormInputName}
            onChange={onChange}
            value={isName}
            errors={errors}
            autoComplete={'given-name'}
          />
          <FormInput
            config={configFormInputEmail}
            onChange={onChange}
            value={isEmail}
            errors={errors}
            autoComplete={'email'}
          />
          <FormInput
            config={configFormInputPassword}
            onChange={onChange}
            errors={errors}
            autoComplete={'new-password'}
          />
          <FormSubmit
            isValid={isValid}
            config={configFormSubmitLogin}
            textMessageError={textMessageError}
          />
        </Form>
      </Main>
    </>
  );
}

export default RegistrationPage;
