import './ListItem.css';

import React from "react";

function ListItem({
  textItem,
}) {
  return (
    <>
      <li className='techs__item'>
        {textItem}
      </li>
    </>
  )
}

export default ListItem;