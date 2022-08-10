import "./Techs.css";

import React from "react";

import ListItem from "../../components/ListItem/ListItem";

function Techs({ config }) {
  const {
    list, title, aboutTitle, aboutDescription,
  } = config;

  return (
    <>
      <section id="techs" className='default__block techs'>
        <h2 id='techsTitle'
          className='default__title techs__heading '>{title}</h2>
        <article className='techs__about'>
          <h3 className='techs__title'>{aboutTitle}</h3>
          <p className='techs__description'>{aboutDescription}</p>
        </article>
        <ul className='techs__list'>
          {list.map(item => {
            return (
              <ListItem
                key={item.id}
                config={item}
              />
            );
          })}
        </ul>
      </section>
    </>
  )
}

export default Techs;
