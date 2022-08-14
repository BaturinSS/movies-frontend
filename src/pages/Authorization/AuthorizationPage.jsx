import React from "react";
import { useHistory } from 'react-router-dom';
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
import MainApi from "../../components/utils/api/MainApi";
import { NODE_ENV } from "../../components/utils/constants";
import useAuth from "../../components/utils/hooks/useAuth";
import { textGreetingsLogin } from '../../components/utils/constants';

function AuthorizationPage({ setCurrentUser, isLoggedIn, setIsLoggedIn }) {
  const [isDownload, setIsDownload] = React.useState(false);
  const [errorApi, setErrorApi] = React.useState('');

  const { errors, isValid, handleChange, values, resetForm } = useAuth();

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
        console.log(message)
        if (token) localStorage.setItem('jwt', token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        history.push('/movies');
        resetForm(event);
      })
      .catch((err) => {
        err.then(({ message }) => {
          if (message === 'Validation failed') {
            setErrorApi('При авторизации пользователя произошла ошибка.');
          } else {
            setErrorApi(message);
          }
        });
      })
      .finally(() => setIsDownload(false))
  }

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
            autoComplete={'username'}
            onChange={onChange}
            onFocus={onChange}
            errors={errors}
          />
          <FormInput
            config={configFormInputPassword}
            autoComplete={'current-password'}
            onChange={onChange}
            onFocus={onChange}
            errors={errors}
          />
          <FormSubmit
            config={configFormSubmitAuth}
            modifier={'form__block_auth'}
            textMessageError={errorApi}
            isValid={isValid}
            isDownload={isDownload}
          />
        </Form>
      </Main>
    </>
  );
}

export default AuthorizationPage;