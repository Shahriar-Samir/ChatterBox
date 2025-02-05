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
    if (
      currentUser.uid &&
      currentUser.email &&
      currentUser.firstName &&
      currentUser.lastName
    ) {
      return;
    }

    const authenticateUser = async () => {
      const response = await auth({}).unwrap();
      if (response.message == "Unauthorized access") {
        await logout({}).unwrap();
        dispatch(
          setUser({ uid: null, email: null, firstName: null, lastName: null })
        );
      } else {
        dispatch(
          setUser({
            uid: response.data.uid,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          })
        );
      }
    };

    authenticateUser();
  }, [auth, dispatch]);

  return children;
};

export default AuthProvider;
