import './ProfilePage.css';
import React from "react";
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Main from '../../../components/Main/Main';
import HeaderLogin from '../../../components/HeaderLogin/HeaderLogin';
import FormProfile from '../../../components/FormProfile/FormProfile';
import GreetingProfile from '../../../components/GreetingProfile/GreetingProfile';
import FormInputProfile from '../../../components/FormInputProfile/FormInputProfile';
import FormSubmitProfile from '../../../components/FormSubmitProfile/FormSubmitProfile';
import configHeaderLogin from '../../../components/utils/config/configHeaderLogin';
import configFormInputEmail from '../../../components/utils/config/formInput/configFormInputEmail';
import configFormInputName from '../../../components/utils/config/formInput/configFormInputName';
import { TranslationContext } from '../../../contexts/TranslationContext'
import useProfile from '../../../components/utils/hooks/useProfile';
import MainApi from "../../../components/utils/api/MainApi";
import { NODE_ENV } from "../../../components/utils/constants";

function ProfilePage({ setCurrentUser, setIsLoggedIn }) {
  const { currentUser } = React.useContext(TranslationContext);
  const [isPermission, setIsPermission] = React.useState(false);
  const [isDownload, setIsDownload] = React.useState(false);
  const [errorApi, setErrorApi] = React.useState('');

  const { errors, isValid, handleChange, values } = useProfile();
  const { inputName, inputEmail } = values;
  const api = new MainApi({ NODE_ENV: NODE_ENV });

  // const [name, setName] = React.useState(currentUser.name);
  // const [email, setEmail] = React.useState(currentUser.email);
  // const [newName, setNewName] = React.useState(currentUser.name);
  // const [newEmail, setNewEmail] = React.useState(currentUser.email);


  const history = useHistory();

  const onChange = (evt) => {
    handleChange(evt);
    // if (evt.target.name === 'Name') {
    //   setNewName(evt.target.value);
    // } else {
    //   setNewEmail(evt.target.value)
    // }
  }

  React.useEffect(() => {

  }, [])

  const editProfile = () => {
    setIsPermission(true);
  }

  const exitEditProfile = () => {
    setIsPermission(false);
  }

  const onSubmitFormProfile = (evt) => {
    evt.preventDefault();

    // api
    //   .editUserInfo()
    //   .then(({ message }) => {
    //     setErrorApi(message);
    //   })
    //   .catch((err) => {
    //     err.then(({ message }) => {
    //       setErrorApi(message);
    //     })
    //   })
    //   .finally(() => setIsDownload(false))




    setIsPermission(false);

    // if (inputName)
    setCurrentUser({
      ...currentUser,
      name: inputName,
      email: inputEmail,
    });

    // if (inputEmail)
    // setCurrentUser({
    //   ...currentUser,

    // });

    setErrorApi('');
  }

  const outputProfile = () => {
    setIsDownload(true);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      history.push('/');
      setIsDownload(false);
    } else {
      api
        .deleteToken()
        .then(({ message }) => {
          setErrorApi(message);
          setTimeout(() => {
            history.push('/');
            setIsLoggedIn(false);
          }, 5000);
        })
        .catch((err) => {
          err.then(({ message }) => {
            setErrorApi(message);
          })
        })
        .finally(() => setIsDownload(false))
    }
  }

  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <GreetingProfile isName={currentUser.name} />
        <FormProfile
          onSubmitFormProfile={onSubmitFormProfile}
          exitEditProfile={exitEditProfile}
          isPermission={isPermission}
        >
          <div className={`form__inputs`}>
            <FormInputProfile
              config={configFormInputName}
              autoComplete={'given-name'}
              onChange={onChange}
              onFocus={onChange}
              value={inputName || currentUser.name}
              isPermission={isPermission}
              errors={errors}
              isName={true}
            />
            <FormInputProfile
              config={configFormInputEmail}
              autoComplete={'username'}
              onChange={onChange}
              onFocus={onChange}
              value={inputEmail || currentUser.email}
              isPermission={isPermission}
              errors={errors}
              isEmail={true}
            />
          </div>
          <FormSubmitProfile
            outputProfile={outputProfile}
            isPermission={isPermission}
            editProfile={editProfile}
            isValid={isValid}
            errors={errorApi}
            isDownload={isDownload}
          />
        </FormProfile>
      </Main>
    </>
  )
}

export default ProfilePage;
