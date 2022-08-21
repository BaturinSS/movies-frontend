import React from "react";
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Form from '../../components/Form/Form';
import FormInput from '../../components/FormInput/FormInput';
import FormSubmit from '../../components/FormSubmit/FormSubmit';
import configFormSubmitAuth from '../../utils/config/formSubmit/configFormSubmitAuth';
import configFormInputPassword from '../../utils/config/formInput/configFormInputPassword';
import configFormInputEmail from '../../utils/config/formInput/configFormInputEmail';
import configFormAuth from '../../utils/config/form/configFormAuth';
import MainApi from "../../utils/api/MainApi";
import useAuth from "../../utils/hooks/useAuth";

import {
  TEXT_GREETINGS_LOGIN, TEXT_ERROR_AUTH_USER,
  TEXT_ERROR, NODE_ENV,
} from '../../utils/constants';

function AuthorizationPage({
  setCurrentUser,
  setIsLoggedIn,
  errorApi,
  setErrorApi,
}) {
  const [isDownload, setIsDownload] = React.useState(false);

  const {
    errors, isValid, handleChange,
    values, resetForm, isValidPassword,
  } = useAuth();

  const api = new MainApi({ NODE_ENV: NODE_ENV });
  const history = useHistory();

  const onChange = (event) => {
    handleChange(event);
    setErrorApi('');
  }

  const onSubmitForm = (event) => {
    const token = localStorage.getItem('jwt');
    if (token) localStorage.removeItem('jwt');
    const { inputPassword, inputEmail } = values;
    event.preventDefault();
    setIsDownload(true);

    api
      .authorize(inputPassword, inputEmail)
      .then(({ user, message, token }) => {
        if (token) localStorage.setItem('jwt', token);
        setErrorApi(message);
        setCurrentUser(user);
        setIsLoggedIn(true);
        history.push('/movies');
        resetForm(event);
      })
      .catch((err) => {
        setErrorApi(TEXT_ERROR);
        if (err.name === 'TypeError') {
          return console.error(err.message);
        };
        err.then(({ message }) => {
          if (message === 'Validation failed') {
            setErrorApi(TEXT_ERROR_AUTH_USER);
          } else {
            setErrorApi(message);
          };
        });
      })
      .finally(() => {
        setIsDownload(false);
        setTimeout(() => setErrorApi(''), 5000);
      });
  };

  return (
    <>
      <Header modifier={'header_auth'}>
        <HeaderAuth textGreetings={TEXT_GREETINGS_LOGIN} />
      </Header>
      <Main>
        <Form
          config={configFormAuth}
          onSubmitForm={onSubmitForm}
        >
          <FormInput
            config={configFormInputEmail}
            autoComplete={'username'}
            onChange={onChange}
            errors={errors} />
          <FormInput
            config={configFormInputPassword}
            autoComplete={'current-password'}
            onChange={onChange}
            errors={errors}
            isValidPassword={isValidPassword} />
          <FormSubmit
            config={configFormSubmitAuth}
            modifier={'form__block_auth'}
            errors={errorApi}
            isValid={isValid}
            isDownload={isDownload} />
        </Form>
      </Main>
    </>
  );
}

export default AuthorizationPage;
