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
import configHeaderLogin from '../../../utils/config/configHeaderLogin';
import configFormInputEmail from '../../../utils/config/formInput/configFormInputEmail';
import configFormInputName from '../../../utils/config/formInput/configFormInputName';
import { TranslationContext } from '../../../contexts/TranslationContext'
import useProfile from '../../../utils/hooks/useProfile';
import MainApi from "../../../utils/api/MainApi";
import { NODE_ENV, TEXT_ERROR_INPUT_NEW } from "../../../utils/constants";
import Popup from '../../../components/Popup/Popup';
import PopupInform from '../../../components/PopupInform/PopupInform';

function ProfilePage({ setCurrentUser, setIsLoggedIn }) {
  const { currentUser } = React.useContext(TranslationContext);
  const [isDownload, setIsDownload] = React.useState(false);
  const [isOpenPopupInform, setIsOpenPopupInform] = React.useState(false);
  const [isDoubleEmail, setIsDoubleEmail] = React.useState(true);
  const [isDoubleName, setIsDoubleName] = React.useState(true);

  const history = useHistory();

  const {
    errors, isValid, resetForm, onChange, newName, newEmail,
    isPermission, setIsPermission, errorApi, setErrorApi,
  } = useProfile();

  const api = new MainApi({ NODE_ENV: NODE_ENV });

  React.useEffect(() => {
    if (!isPermission) return;

    const exitByEscape = (event) => {
      if (event.key === 'Escape') {
        setIsPermission(false);
        setIsOpenPopupInform(false);
      }
    }

    document.addEventListener('keydown', exitByEscape);

    return () => {
      resetForm();
      document.removeEventListener('keydown', exitByEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission]);

  const editProfile = () => {
    setIsPermission(true);
  }

  const exitEditProfile = () => {
    setIsPermission(false);
  }

  const updateProfile = () => {
    setIsDownload(true);
    api
      .editUserInfo(newName.trim(), newEmail.trim())
      .then(({ message, user }) => {
        setErrorApi(message);
        setTimeout(
          () => setIsPermission(false), 1000
        );
        setCurrentUser({
          ...currentUser,
          name: user.name,
          email: user.email,
        });
      })
      .catch((err) => {
        err.then(({ message }) => {
          setErrorApi(message);
        })
      })
      .finally(setIsDownload(false))
  }

  const outputProfile = () => {
    setIsDownload(true);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setIsDownload(false);
      setIsOpenPopupInform(false);
      history.push('/');
    } else {
      api
        .deleteToken()
        .then(({ message }) => {
          setErrorApi(message);
          history.push('/');
          setIsLoggedIn(false);
          setIsOpenPopupInform(false);
        })
        .catch((err) => {
          err.then(({ message }) => {
            setErrorApi(message);
            setTimeout(() => setErrorApi(''), 5000);
          })
        })
        .finally(setIsDownload(false))
    }
  }

  const onSubmitFormProfile = (evt) => {
    evt.preventDefault();
    if (newName.trim() !== currentUser.name.trim() ||
      newEmail.trim() !== currentUser.email.trim()) {
      updateProfile();
    } else {
      setErrorApi(TEXT_ERROR_INPUT_NEW);
      setTimeout(() => setErrorApi(''), 5000);
    }
  }

  const handleClickExit = () => {
    setIsOpenPopupInform(true);
  }

  const clickButtonConfirm = () => {
    outputProfile();
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
              value={newName}
              isPermission={isPermission}
              errors={errors}
              isName={true}
              currentUser={currentUser}
              setIsDoubleName={setIsDoubleName}
            />
            <FormInputProfile
              config={configFormInputEmail}
              autoComplete={'username'}
              onChange={onChange}
              value={newEmail}
              isPermission={isPermission}
              errors={errors}
              isEmail={true}
              currentUser={currentUser}
              setIsDoubleEmail={setIsDoubleEmail}
            />
          </div>
          <FormSubmitProfile
            outputProfile={handleClickExit}
            isPermission={isPermission}
            editProfile={editProfile}
            isValid={isValid && (!isDoubleName || !isDoubleEmail)}
            error={errorApi}
            isDownload={isDownload}
          />
        </FormProfile>
      </Main>
      <Popup
        keydownEnter={outputProfile}
        setIsOpenPopup={setIsOpenPopupInform}
        isOpenPopup={isOpenPopupInform}>
        <PopupInform
          message={'Вы уверены?'}
          textButton={`${isDownload ? 'Выхожу...' : 'Да'}`}
          clickButton={clickButtonConfirm} />
      </Popup>
    </>
  )
}

export default ProfilePage;
