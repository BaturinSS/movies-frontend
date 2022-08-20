import "./NavTab.css";
import { Link as LinkScroll } from "react-scroll";

function NavTab({
  config,
}) {
  const { links } = config;

  return (
    <>
      <nav className='nav-tab'>
        {links.map(({ href, title }, i) => {
          return (
            <LinkScroll
              key={i * 18}
              className={'nav-tab__link'}
              activeClass=''
              to={href.substring(2)}
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              {title}
            </LinkScroll>
          );
        })}
      </nav>
    </>
  )
}

export default NavTab;
