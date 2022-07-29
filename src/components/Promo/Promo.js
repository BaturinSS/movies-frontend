import './Promo.css';

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import NavTab from '../NavTab/NavTab'

function Promo(

) {
  return (
    <>
      <div className='promo'>
        <p className='promo__description'>
          Учебный проект студента факультета Веб-разработки.
        </p>
        <NavTab />
      </div>
    </>
  )
}

export default Promo;