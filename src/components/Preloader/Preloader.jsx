import React from 'react'
import './Preloader.css'

const Preloader = ({
  modifier,
}) => {

  return (
    <div className={`preloader ${(modifier) ? modifier : ''}`}>
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  )
};

export default Preloader;
