import './Main.css';

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import Promo from '../Promo/Promo'

function Main(

) {
  return (
    <>
      <div className='main'>
        <Promo />
      </div>
    </>
  )
}

export default Main;