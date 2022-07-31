import './Main.css';

import React from "react";

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main(

) {
  return (
    <>
      <section className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </section>
    </>
  )
}

export default Main;