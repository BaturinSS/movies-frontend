import "./Techs.css";
import React from "react";
import ListItem from "../ListItem/ListItem";

function Techs({
  config,
}) {
  const {
    list, title, aboutTitle, aboutDescription,
  } = config;

  return (
    <>
      <section className='default__block techs' id="techs" >
        <h2 className='default__title techs__heading' id='techsTitle'>{title}</h2>
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
