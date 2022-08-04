import './Promo.css';

import React from "react";

function Promo({
  children,
}) {
  return (
    <>
      <section className='promo'>
        <h1 className='promo__description'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        {children}
      </section>
    </>
  )
}

export default Promo;