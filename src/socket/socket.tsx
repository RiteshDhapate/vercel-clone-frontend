
"use client";


import { useMemo, createContext, useContext, FC } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = (): SocketContextType | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider: FC<SocketProviderProps> = (props) => {
  const socket = useMemo(() => io(`${process.env.NEXT_PUBLIC_SERVER_URL}`), []);

  const socketContextValue: SocketContextType = {
    socket,
  };

  return (
    <SocketContext.Provider value={socketContextValue}>
      {props.children}
    </SocketContext.Provider>
  );
};
