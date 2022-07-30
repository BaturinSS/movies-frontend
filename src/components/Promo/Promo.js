import './Promo.css';

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import NavTab from '../NavTab/NavTab'

function Promo(

) {
  return (
    <>
      <section className='promo'>
        <h1 className='promo__description'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </section>
    </>
  )
}

export default Promo;