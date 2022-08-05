import './ProfilePage.css';

import React from "react";
import { useState, useEffect } from "react";

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import FormProfile from '../../components/FormProfile/FormProfile';
import GreetingProfile from "../../components/GreetingProfile/GreetingProfile";
import FormInputProfile from '../../components/FormInputProfile/FormInputProfile';
import FormSubmitProfile from '../../components/FormSubmitProfile/FormSubmitProfile';

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configFormInputEmail from "../../components/utils/config/formInput/configFormInputEmail";
import configFormInputName from '../../components/utils/config/formInput/configFormInputName';

function ProfilePage({
  isLoggedIn, closeOpenMenu,
  isOpenMenu, isEmail, setIsEmail, isName,
  setIsName, outputProfile, onSubmitFormProfile,
}) {
  const [isPermission, setIsPermission] = useState(true);
  const [isNewName, setIsNewName] = useState(isName);
  const [isNewEmail, setIsNewEmail] = useState(isEmail);

  useEffect(() => {
    setIsName(isNewName)
    setIsEmail(isNewEmail)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission]);

  const handleNewEmailChange = (event) => {
    setIsNewEmail(event.target.value);
  }

  const handleNewNameChange = (event) => {
    setIsNewName(event.target.value);
  }

  const editProfile = () => {
    setIsPermission(!isPermission)
  }
  return (
    <>
      <Header>
        {isLoggedIn && <HeaderLogin
          config={configHeaderLogin}
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </Header>
      <Main>
        <GreetingProfile isName={isName} />
        <FormProfile
          onSubmitFormProfile={onSubmitFormProfile}
        >
          <div className={`form__inputs`}>
            <FormInputProfile
              modifier={'form__input_profile'}
              modifierLabel={'form__input-label_profile'}
              config={configFormInputName}
              onChange={handleNewNameChange}
              value={isPermission ? isName : isNewName}
              readOnly={isPermission}
            />
            <FormInputProfile
              modifier={'form__input_profile'}
              modifierLabel={'form__input-label_profile'}
              config={configFormInputEmail}
              onChange={handleNewEmailChange}
              value={isPermission ? isEmail : isNewEmail}
              readOnly={isPermission}
            />
          </div>
          <FormSubmitProfile
            modifier={'form__block_profile'}
            outputProfile={outputProfile}
            isPermission={isPermission}
            editProfile={editProfile}
          />
        </FormProfile>
      </Main>
    </>
  )
}

export default ProfilePage;