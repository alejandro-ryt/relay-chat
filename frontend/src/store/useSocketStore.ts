// import { io } from "socket.io-client";
// import { create } from "zustand";
// import { TSocketState, TSocketActions } from "@/types/socket.types";

// export const useSocketStore = create<TSocketState & TSocketActions>(
//   (set, get) => ({
//     socket: io(import.meta.env.VITE_WS_URL),
//     // initiateSocket: (userId) => {
//     //   const socket = get().socket;
//     //   if (socket) {
//     //     socket.emit("initiateSocket", userId);
//     //   }
//     // },
//   })
// );
