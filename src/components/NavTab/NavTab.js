import './NavTab.css';

function NavTab({
  children,
}) {
  return (
    <>
      <nav className='nav-tab'>
        {children}
      </nav>
    </>
  )
}

export default NavTab;