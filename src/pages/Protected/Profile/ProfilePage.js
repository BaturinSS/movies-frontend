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
import Popup from '../../../components/Popup/Popup';
import PopupInform from '../../../components/PopupInform/PopupInform';
import { actionTimeout } from '../../../components/utils/utils'

function ProfilePage({ setCurrentUser, setIsLoggedIn }) {
  const { currentUser } = React.useContext(TranslationContext);
  const [isDownload, setIsDownload] = React.useState(false);
  const [isOpenPopupInform, setIsOpenPopupInform] = React.useState(false);
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
      .editUserInfo(newName, newEmail)
      .then(({ message, user }) => {
        setErrorApi(message);
        actionTimeout(
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
      history.push('/');
      setIsDownload(false);
    } else {
      api
        .deleteToken()
        .then(({ message }) => {
          setErrorApi(message);
          history.push('/');
          setIsLoggedIn(false);
        })
        .catch((err) => {
          err.then(({ message }) => {
            setErrorApi(message);
          })
        })
        .finally(setIsDownload(false))
    }
  }

  const onSubmitFormProfile = (evt) => {
    evt.preventDefault();
    if (newName !== currentUser.name || newEmail !== currentUser.email) {
      updateProfile();
    } else {
      setErrorApi('Вы не изменили информацию о пользователе !');
      actionTimeout(() => setErrorApi(''), 5000);
    }
  }

  const handleClickExit = () => {
    setIsOpenPopupInform(true);
  }

  const clickButtonConfirm = () => {
    outputProfile();
    setIsOpenPopupInform(false);
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
              value={newName}
              isPermission={isPermission}
              errors={errors}
              isName={true}
            />
            <FormInputProfile
              config={configFormInputEmail}
              autoComplete={'username'}
              onChange={onChange}
              onFocus={onChange}
              value={newEmail}
              isPermission={isPermission}
              errors={errors}
              isEmail={true}
            />
          </div>
          <FormSubmitProfile
            outputProfile={handleClickExit}
            isPermission={isPermission}
            editProfile={editProfile}
            isValid={isValid}
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
