import "./Promo.css";
import React from "react";
import NavTab from "../NavTab/NavTab";

function Promo({
  config,
}) {
  const { description } = config;

  return (
    <>
      <section className='promo'>
        <h1 className='promo__description'>{description}</h1>
        <NavTab config={config} />
      </section>
    </>
  )
}

export default Promo;
