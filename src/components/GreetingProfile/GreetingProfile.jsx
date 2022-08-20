import './GreetingProfile.css';
import React from "react";

function GreetingProfile({
  isName,
}) {

  return (
    <>
      <h1 className='main__title'>{`Привет, ${isName}!`}</h1>
    </>
  )
}

export default GreetingProfile;
