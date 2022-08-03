import './MainProfile.css';

import FormProfile from '../../FormProfile/FormProfile';

function MainProfile({
  isEmail,
  setIsEmail,
  isName,
  setIsName,
  outputProfile,
}) {
  return (
    <>
      <section className={`main`}>
        <h1 className='main__title'>{`Привет, ${isName}!`}</h1>
        <FormProfile
          isEmail={isEmail}
          setIsEmail={setIsEmail}
          isName={isName}
          setIsName={setIsName}
          outputProfile={outputProfile}
        />
      </section>
    </>
  )
}

export default MainProfile;