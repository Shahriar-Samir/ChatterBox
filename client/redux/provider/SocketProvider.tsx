"use client";

import { createContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import io, { Socket } from "socket.io-client";
import { setConnected } from "../user/socketSlice";
import { setActiveUsers } from "../user/activeUsersSlice";

export const SocketContext = createContext<Socket | null>(null);

export default function SocketContextProvider({ children }) {
  const currentUser = useAppSelector((state) => state.user);
  const isConnected = useAppSelector((state) => state.socket.isConnected);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const [conversations, setConversations] = useState<any>([]);

  useEffect(() => {
    if (!currentUser?.uid || isConnected) return; // ✅ Prevents duplicate connections

    // ✅ Cleanup previous socket before setting a new one
    if (socket) {
      socket.close();
    }

    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
      query: { uid: currentUser.uid },
    });

    setSocket(newSocket);

    // ✅ Confirm connection before dispatching
    newSocket.on("connect", () => {
      dispatch(setConnected(true));
    });

    // ✅ Handle active users update
    newSocket.on("getActiveUsers", (users) => {
      dispatch(setActiveUsers(users));
    });

    // ✅ Handle disconnection
    newSocket.on("disconnect", () => {
      dispatch(setConnected(false));
    });

    return () => {
      newSocket.close(); // ✅ Ensure cleanup on unmount
      setSocket(null);
    };
  }, [currentUser?.uid, dispatch]); // ✅ Depend on user ID and dispatch

  return (
    <SocketContext.Provider
      value={{ messages, setMessages, socket, conversations, setConversations }}
    >
      {children}
    </SocketContext.Provider>
  );
}
