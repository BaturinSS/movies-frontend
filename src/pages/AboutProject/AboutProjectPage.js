import './AboutProjectPage.css';

import React from "react";

import MainAboutProject from '../../components/Main/AboutProject/MainAboutProject';

function AboutProjectPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  Footer,
  Header,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <MainAboutProject />
      <Footer />
    </>
  )
}

export default AboutProjectPage;