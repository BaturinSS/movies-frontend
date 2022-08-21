import "./ListItem.css";
import React from "react";

function ListItem({
  config,
}) {
  const { textItem } = config;

  return (
    <>
      <li className='techs__item'>{textItem}</li>
    </>
  )
}

export default ListItem;
