import './Main.css';

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'

function Main(

) {
  return (
    <>
      <section className='main'>
        <Promo />
        <AboutProject />
      </section>
    </>
  )
}

export default Main;