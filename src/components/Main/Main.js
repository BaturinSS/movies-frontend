import './Main.css';

import React from "react";

function Main({
  children,
}) {
  return (
    <>
      <section className='main'>
        {children}
      </section>
    </>
  )
}

export default Main;