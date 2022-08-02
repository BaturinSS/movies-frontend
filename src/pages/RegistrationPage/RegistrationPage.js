import MainRegistration from '../../components/Main/RegistrationPage/MainRegistration';

function RegistrationPage({
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
        textGreetings={`Добро пожаловать!`}
      />
      <MainRegistration
        onSubmitForm={onSubmitForm}
      />
    </>
  );
}

export default RegistrationPage;