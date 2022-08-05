import React from "react";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import HeaderNotLogin from '../../components/HeaderNotLogin/HeaderNotLogin';
import Promo from '../../components/Promo/Promo';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';

import configHeaderNotLogin from "../../components/utils/config/configHeaderNotLogin";
import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configPromo from '../../components/utils/config/configPromo';
import configAboutProject from "../../components/utils/config/configAboutProject";
import configTechs from "../../components/utils/config/configTechs";
import configAboutMe from "../../components/utils/config/configTechs copy";
import configFooter from "../../components/utils/config/configFooter";

function AboutProjectPage({
  isLoggedIn, closeOpenMenu, isOpenMenu,
}) {
  return (
    <>
      <Header>
        {!isLoggedIn && <HeaderNotLogin
          config={configHeaderNotLogin}
        />}
        {isLoggedIn && <HeaderLogin
          config={configHeaderLogin}
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </Header>
      <Main>
        <Promo config={configPromo} />
        <AboutProject config={configAboutProject} />
        <Techs config={configTechs} />
        <AboutMe config={configAboutMe} />
      </Main>
      <Footer config={configFooter} />
    </>
  )
}
export default AboutProjectPage;