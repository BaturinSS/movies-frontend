import React from "react";

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import MainProfile from '../../components/Main/Profile/MainProfile';

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";

function ProfilePage({
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
  isEmail,
  setIsEmail,
  isName,
  setIsName,
  outputProfile,
}) {
  return (
    <>
      <Header>
        {isLoggedIn && <HeaderLogin
          config={configHeaderLogin}
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </Header>
      <MainProfile
        isEmail={isEmail}
        setIsEmail={setIsEmail}
        isName={isName}
        setIsName={setIsName}
        outputProfile={outputProfile}
      />
    </>
  )
}

export default ProfilePage;