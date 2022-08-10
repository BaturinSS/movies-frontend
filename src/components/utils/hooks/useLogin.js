import { useState } from "react";

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return { isLoggedIn }
}

export default useLogin;
