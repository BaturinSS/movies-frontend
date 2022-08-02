import './AboutProjectPage.css';

import MainAboutProject from '../../components/Main/AboutProject/MainAboutProject';

function AboutProjectPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  Footer,
  Header,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <MainAboutProject />
      <Footer />
    </>
  )
}

export default AboutProjectPage;