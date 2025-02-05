"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useRef } from "react";
import { setConnected } from "../user/socketSlice";
import io, { Socket } from "socket.io-client";
import { setActiveUsers } from "../user/activeUsersSlice";

export default function SocketContextProvider({ children }) {
  const currentUser = useAppSelector((state) => state.user);
  const isConnected = useAppSelector((state) => state.socket.isConnected);
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null); // ✅ Keep socket instance outside Redux

  useEffect(() => {
    if (!currentUser?.uid || isConnected) return; // ✅ Prevents duplicate connections

    // ✅ Cleanup previous socket instance (if any)
    socketRef.current?.close();

    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
      query: { uid: currentUser.uid },
    });

    socketRef.current = newSocket; // ✅ Store socket in ref, not Redux
    dispatch(setConnected(true));

    // ✅ Handle active users update
    newSocket.on("getActiveUsers", (users) => {
      dispatch(setActiveUsers(users));
    });

    // ✅ Handle disconnection
    newSocket.on("disconnect", () => {
      dispatch(setConnected(false));
    });

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [currentUser?.uid]); // ✅ Correct dependency list

  return <>{children}</>;
}
