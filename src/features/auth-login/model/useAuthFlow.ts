import { useCallback, useState } from "react";

export function useAuthFlow() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const openLogin = useCallback(() => {
    setSignupOpen(false);
    setLoginOpen(true);
  }, []);
  const openSignup = useCallback(() => {
    setLoginOpen(false);
    setSignupOpen(true);
  }, []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);
  const closeSignup = useCallback(() => setSignupOpen(false), []);

  const goSignup = useCallback(() => {
    setLoginOpen(false);
    setSignupOpen(true);
  }, []);
  const goLogin = useCallback(() => {
    setSignupOpen(false);
    setLoginOpen(true);
  }, []);

  return {
    loginOpen,
    signupOpen,
    openLogin,
    openSignup,
    closeLogin,
    closeSignup,
    goSignup,
    goLogin,
  };
}
