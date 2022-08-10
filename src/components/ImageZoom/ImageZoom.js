import './ImageZoom.css';

import React from "react";

function ImageZoom({ titleImage, isLinkImage }) {
  return (
    <>
      <img className={'popup__zoom-image'} src={isLinkImage} alt={titleImage}/>
    </>
  )
}

export default ImageZoom;