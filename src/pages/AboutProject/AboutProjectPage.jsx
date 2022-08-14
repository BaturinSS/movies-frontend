import React from "react";
import Header from "../../components/Header/Header";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import HeaderNotLogin from "../../components/HeaderNotLogin/HeaderNotLogin";
import configHeaderNotLogin from "../../components/utils/config/configHeaderNotLogin";
import Main from "../../components/Main/Main";
import Promo from "../../components/Promo/Promo";
import configPromo from "../../components/utils/config/configPromo";
import AboutProject from "../../components/AboutProject/AboutProject";
import configAboutProject from "../../components/utils/config/configAboutProject";
import Techs from "../../components/Techs/Techs";
import configTechs from "../../components/utils/config/configTechs";
import AboutMe from "../../components/AboutMe/AboutMe";
import configAboutMe from "../../components/utils/config/configAboutMe";
import Footer from "../../components/Footer/Footer";
import configFooter from "../../components/utils/config/configFooter";

function AboutProjectPage({ isLoggedIn, isDownload }) {

  return (
    <>
      <Header>
        {isDownload
          ? null
          : isLoggedIn
            ? <HeaderLogin config={configHeaderLogin} />
            : <HeaderNotLogin config={configHeaderNotLogin} />}
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
