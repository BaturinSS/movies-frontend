import './ImageZoom.css';
import React from "react";

function ImageZoom({
  titleImage, linkImage,
}) {

  return (
    <>
      <img className={'popup__zoom-image'} src={linkImage} alt={titleImage} />
    </>
  )
}

export default ImageZoom;
