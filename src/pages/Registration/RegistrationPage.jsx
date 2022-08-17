import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Form from "../../components/Form/Form";
import configFormLogin from "../../utils/config/form/configFormLogin";
import FormInput from "../../components/FormInput/FormInput";
import configFormInputEmail from "../../utils/config/formInput/configFormInputEmail";
import configFormInputPassword from "../../utils/config/formInput/configFormInputPassword";
import configFormInputName from "../../utils/config/formInput/configFormInputName";
import FormSubmit from "../../components/FormSubmit/FormSubmit";
import configFormSubmitLogin from "../../utils/config/formSubmit/configFormSubmitLogin";
import useRegistration from "../../utils/hooks/useRegistration";
import MainApi from "../../utils/api/MainApi";
import {
  NODE_ENV, TEXT_ERROR_NO_CONNECTION, TEXT_ERROR_REGISTRATION,
} from "../../utils/constants";

function RegistrationPage({ setCurrentUser, setIsLoggedIn }) {
  const [isDownload, setIsDownload] = React.useState(false);
  const [errorApi, setErrorApi] = React.useState('');
  const api = new MainApi({ NODE_ENV: NODE_ENV });
  const history = useHistory();
  const { errors, isValid, values, handleChange, resetForm } = useRegistration();

  const onChange = (event) => {
    handleChange(event);
    setErrorApi('');
  }

  const onSubmitForm = (event) => {
    const token = localStorage.getItem('jwt');
    if (token) localStorage.removeItem('jwt');
    const { inputPassword, inputEmail, inputName } = values;
    event.preventDefault();
    setIsDownload(true);
    api
      .register(inputPassword, inputEmail, inputName)
      .then(({ user, message, token }) => {
        setErrorApi(message);
        if (token) localStorage.setItem('jwt', token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        history.push('/movies');
        resetForm(event);
      })
      .catch((err) => {
        if (err.name === 'TypeError') {
          return console.error(`${TEXT_ERROR_NO_CONNECTION}: "${err.message}"`);
        }
        err.then(({ message }) => {
          if (message === 'Validation failed') {
            setErrorApi(TEXT_ERROR_REGISTRATION);
          } else {
            setErrorApi(message);
          }
          resetForm(event);
        });
      })
      .finally(() => setIsDownload(false));
  }

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
            errors={errors}
            autoComplete={'given-name'}
          />
          <FormInput
            config={configFormInputEmail}
            onChange={onChange}
            errors={errors}
            autoComplete={'username'}
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
            textMessageError={errorApi}
            isDownload={isDownload}
          />
        </Form>
      </Main>
    </>
  );
}

export default RegistrationPage;
