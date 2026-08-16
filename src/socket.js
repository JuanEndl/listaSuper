import { io } from "socket.io-client";

export const socket = io("/", {
  path: "/socket.io",
  transports: ["websocket", "polling"]
});

socket.on("connect", () => {
  console.log("Socket conectado:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Socket error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("Socket desconectado:", reason);
});
