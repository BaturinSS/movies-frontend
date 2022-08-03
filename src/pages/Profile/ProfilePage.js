import MainProfile from '../../components/Main/Profile/MainProfile';

function ProfilePage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  Header,
  isEmail,
  setIsEmail,
  isName,
  setIsName,
  outputProfile,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <MainProfile
        isEmail={isEmail}
        setIsEmail={setIsEmail}
        isName={isName}
        setIsName={setIsName}
        outputProfile={outputProfile}
      />
    </>
  )
}

export default ProfilePage;