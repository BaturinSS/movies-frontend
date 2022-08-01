import './HeaderTypical.css';

import React from "react";

import HeaderNotLogin from '../HeaderNotLogin/HeaderNotLogin';
import HeaderLogin from '../HeaderLogin/HeaderLogin';

function HeaderTypical({
  children,
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
}) {
  return (
    <>
      <section className='header'>
        {children}
        {isLoggedIn && <HeaderNotLogin />}
        {!isLoggedIn && <HeaderLogin
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </section>
    </>
  )
}

export default HeaderTypical;