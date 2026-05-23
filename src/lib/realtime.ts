import type { Socket } from "socket.io-client";

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();
const realtimeEvents = [
  "menu:update",
  "special:update",
  "event:update",
  "openingHours:update",
] as const;

let socket: Socket | null = null;
let activeUrl: string | null = null;
let connectPromise: Promise<void> | null = null;

export function connectPublicRealtime(wsUrl: string) {
  const normalizedUrl = wsUrl.replace(/\/$/, "");
  if ((socket || connectPromise) && activeUrl === normalizedUrl) return;

  socket?.disconnect();
  socket = null;
  activeUrl = normalizedUrl;

  connectPromise = import("socket.io-client")
    .then(({ io }) => {
      if (activeUrl !== normalizedUrl || socket) return;

      const nextSocket = io(`${normalizedUrl}/public`, {
        transports: ["websocket", "polling"],
        withCredentials: false,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 3000,
        reconnectionDelayMax: 15000,
        timeout: 20000,
      });

      realtimeEvents.forEach((event) => {
        nextSocket.on(event, () => {
          listeners.get(event)?.forEach((fn) => fn());
        });
      });

      socket = nextSocket;
    })
    .catch(() => {
      if (activeUrl === normalizedUrl) activeUrl = null;
    })
    .finally(() => {
      if (activeUrl === normalizedUrl) connectPromise = null;
    });
}

export function onRealtime(event: string, fn: Listener): () => void {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event)!.add(fn);
  return () => listeners.get(event)?.delete(fn);
}
