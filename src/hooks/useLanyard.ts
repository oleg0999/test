/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LanyardData, LanyardResponse } from '../types/lanyard';

const DISCORD_USER_ID = "489975528464449536";

export function useLanyard() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let heartbeatInterval: any = null;

    const connect = () => {
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onopen = () => {
        socket?.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: DISCORD_USER_ID
          }
        }));
      };

      socket.onmessage = (event) => {
        const packet: any = JSON.parse(event.data);

        if (packet.op === 1) {
          heartbeatInterval = setInterval(() => {
            socket?.send(JSON.stringify({ op: 1 }));
          }, packet.d.heartbeat_interval);
        }

        if (packet.op === 0 && (packet.t === "INIT_STATE" || packet.t === "PRESENCE_UPDATE")) {
          setData(packet.d);
        }
      };

      socket.onerror = () => {
        setError("Lanyard WebSocket error");
      };

      socket.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      socket?.close();
    };
  }, []);

  return { data, error };
}
