"use client";

import { useEffect } from "react";
import { useAuthMutation, useLogoutMutation } from "../api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setUser } from "../user/userSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth] = useAuthMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser.uid && currentUser.email) {
      return;
    }

    const authenticateUser = async () => {
      const response = await auth({}).unwrap();
      console.log(response);
      if (response.message == "Unauthorized access") {
        await logout({}).unwrap();
        dispatch(setUser({ uid: null, email: null }));
      } else {
        dispatch(
          setUser({ uid: response.data.uid, email: response.data.email })
        );
      }
    };

    authenticateUser();
  }, [auth, dispatch]);

  return children;
};

export default AuthProvider;
