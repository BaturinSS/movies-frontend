import './NavTab.css';

import LinkAnchor from '../../components/LinkAnchor/LinkAnchor';

function NavTab({
  config,
}) {
  const { links } = config;
  return (
    <>
      <nav className='nav-tab'>
        {links.map(link => {
          return (
            <LinkAnchor
              key={link.id}
              config={link}
              selector={'nav-tab__link'}
            />
          );
        })}
      </nav>
    </>
  )
}

export default NavTab;