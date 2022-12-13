import "./Promo.css";
import React from "react";
import NavTab from "../NavTab/NavTab";
import useLanguage from "../../utils/hooks/useLanguage";

function Promo({
  config,
}) {
  const {description} = config;
  const {selectionLanguage, setIsLang, isLang} = useLanguage();

  return (
    <>
      <section className='promo'>
        <div>
          <button onClick={() => setIsLang('ru')}>RU</button>
          <button onClick={() => setIsLang('en')}>EN</button>
          <button onClick={() => setIsLang('ge')}>GE</button>
        </div>
        <h1 className='promo__description' lang={`${isLang}`}>{selectionLanguage(description)}</h1>
        <NavTab config={config} selectionLanguage={selectionLanguage} isLang={isLang}/>
      </section>
    </>
  )
}

export default Promo;
