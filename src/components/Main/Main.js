import './Main.css';

import React from "react";

import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'

function Main(

) {
  return (
    <>
      <section className='main'>
        <Promo />
        <AboutProject />
        <Techs />
      </section>
    </>
  )
}

export default Main;