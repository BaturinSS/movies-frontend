import MainAuthentication from "../../components/Main/Authentication/MainAuthentication";

function AuthenticationPage({
  Header,
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
  onSubmitForm,
  isEmail,
  setIsEmail,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
        textGreetings={`Рады видеть!`}
      />
      <MainAuthentication
        onSubmitForm={onSubmitForm}
        isEmail={isEmail}
        setIsEmail={setIsEmail}
      />
    </>
  );
}

export default AuthenticationPage;