import MainAuthentication from "../../components/Main/Authentication/MainAuthentication";

function AuthenticationPage({
  Header,
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
  onSubmitForm,
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
      />
    </>
  );
}

export default AuthenticationPage;