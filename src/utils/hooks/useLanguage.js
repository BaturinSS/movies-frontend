import React from "react";

const useLanguage = () => {
  const [isLang, setIsLang] = React.useState(window.navigator.language)
  document.querySelector('html').lang = `${isLang}`

  const selectionLanguage = (contentObject) => {
    return isLang in contentObject
      ? contentObject[`${isLang}`]
      : contentObject.en
        ? contentObject.en
        : contentObject.ru
  }

  return { selectionLanguage, setIsLang,  isLang};
}

export default useLanguage;
