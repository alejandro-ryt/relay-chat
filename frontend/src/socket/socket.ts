import { Socket, io } from "socket.io-client";

const socket: Socket =
  (globalThis as any).socket || io(import.meta.env.VITE_BASE_URL);

(globalThis as any).socket = socket;

export default socket;
