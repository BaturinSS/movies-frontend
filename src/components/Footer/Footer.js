import "./Footer.css";

import React from "react";

import LinkReact from "../../components/LinkReact/LinkReact";

function Footer({ config }) {
  const { title, links, copyright } = config;

  return (
    <>
      <footer className='footer'>
        <h2 className='footer__title'>{title}</h2>
        <article className='footer__block'>
          <nav className='footer__links'>
            {links.map(link => {
              return (
                <LinkReact
                  key={link.id}
                  config={link}
                  selector={'footer__link'}
                />
              );
            })}
          </nav>
          <p className='footer__copyright'>
            © {new Date().getFullYear()}. {copyright}</p>
        </article>
      </footer>
    </>
  )
}

export default Footer;
