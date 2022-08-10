import "./NavTab.css";

import { Link as LinkScroll } from "react-scroll";

function NavTab({ config }) {
  const { links } = config;

  return (
    <>
      <nav className='nav-tab'>
        {links.map(link => {
          return (
            <LinkScroll
              className={'nav-tab__link'}
              activeClass=''
              to={link.href.substring(2)}
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              {link.title}
            </LinkScroll>
          );
        })}
      </nav>
    </>
  )
}

export default NavTab;