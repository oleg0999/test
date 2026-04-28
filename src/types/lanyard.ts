/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LanyardData {
  discord_user: {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    avatar: string;
    global_name: string;
    avatar_decoration: string | null;
  };
  activities: {
    type: number;
    state: string;
    name: string;
    id: string;
    details: string;
    created_at: number;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    timestamps?: {
      start: number;
      end?: number;
    };
    application_id?: string;
  }[];
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

export interface LanyardResponse {
  op: number;
  t?: string;
  d: LanyardData;
}
