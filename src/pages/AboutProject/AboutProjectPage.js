import React from "react";
import { useHistory } from "react-router-dom";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import Promo from '../../components/Promo/Promo';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';
import Portfolio from '../../components/Portfolio/Portfolio';

import HeaderNotLogin from '../../components/HeaderNotLogin/HeaderNotLogin';
import HeaderLogin from '../../components/HeaderLogin/HeaderLogin';
import NavTab from '../../components/NavTab/NavTab';
import LinkAnchor from '../../components/LinkAnchor/LinkAnchor';
import ListItem from '../../components/ListItem/ListItem'

import configLinkAnchorAboutProject from '../../components/utils/config/linkAnchor/configLinkAnchorAboutProject';
import configLinkAnchorTechs from "../../components/utils/config/linkAnchor/configLinkAnchorTechs";
import configLinkAnchorAboutMe from "../../components/utils/config/linkAnchor/configLinkAnchorAboutMe";

import configAboutProjectPage from "../../components/utils/config/pages/configAboutProjectPage";
import configFooter from "../../components/utils/config/default/configFooter";

function AboutProjectPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
}) {
  const {
    header,
  } = configAboutProjectPage;

  const { configNotLogin, configLogin } = header;

  const currentPath = useHistory().location.pathname;
  const isSignIn = currentPath === '/sign-in' || currentPath === '/sign-up';

  const loggedIn = isSignIn || isLoggedIn

  return (
    <>
      <Header
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
        isLoggedIn={isLoggedIn}
        isSignIn={isSignIn}
      >
        {!loggedIn && <HeaderNotLogin
          config={configNotLogin}
        />}

        {loggedIn && <HeaderLogin
          config={configLogin}
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </Header>
      <Main>
        <Promo>
          <NavTab>
            <LinkAnchor
              config={configLinkAnchorAboutProject}
            />
            <LinkAnchor
              config={configLinkAnchorTechs}
            />
            <LinkAnchor
              config={configLinkAnchorAboutMe}
            />
          </NavTab>
        </Promo>
        <AboutProject />
        <Techs>
          <ListItem
            textItem={'HTML'}
          />
          <ListItem
            textItem={'CSS'}
          />
          <ListItem
            textItem={'JS'}
          />
          <ListItem
            textItem={'React'}
          />
          <ListItem
            textItem={'Git'}
          />
          <ListItem
            textItem={'Express.js'}
          />
          <ListItem
            textItem={'mongoDB'}
          />
        </Techs>
        <AboutMe>
          <Portfolio />
        </AboutMe>
      </Main>
      <Footer
        config={configFooter}
      />
    </>
  )
}

export default AboutProjectPage;