/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanyardData } from '../types/lanyard';

interface DiscordRPCProps {
  data: LanyardData | null;
  loading?: boolean;
}

const statusColors = {
  online: '#23a55a',
  idle: '#faa81a',
  dnd: '#ed4245',
  offline: '#747f8d',
};

const statusText = {
  online: 'В сети',
  idle: 'Не активен',
  dnd: 'Не беспокоить',
  offline: 'Не в сети',
};

export function DiscordRPC({ data, loading }: DiscordRPCProps) {
  if (loading || !data) {
    return (
      <div className="bg-black/30 p-5 rounded-[2rem] border-l-4 border-blue-500 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#23a55a]"></div>
          <span className="text-blue-200/80 text-sm">Discord RPC — загрузка статуса...</span>
        </div>
      </div>
    );
  }

  const status = data.discord_status || 'offline';
  const color = statusColors[status];
  const activity = data.activities.length > 0 ? data.activities[0] : null;

  const getActivityImage = (activity: any) => {
    if (!activity) return null;
    if (activity.name === "Spotify" && activity.assets?.large_image) {
      return `https://i.scdn.co/image/${activity.assets.large_image.replace('spotify:', '')}`;
    }
    if (activity.assets?.large_image) {
      if (activity.assets.large_image.startsWith('mp:external/')) {
        const externalId = activity.assets.large_image.replace('mp:external/', '');
        return `https://media.discordapp.net/external/${externalId}`;
      }
      if (activity.application_id) {
        return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
      }
    }
    return null;
  };

  const activityImg = getActivityImage(activity);

  return (
    <div className="bg-black/40 my-6 p-5 border-l-4 border-blue-600 rounded-2xl flex items-center gap-5 group transition-all hover:bg-black/50">
      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700/50">
          {activityImg ? (
            <img src={activityImg} className="w-full h-full object-cover" alt="Activity" />
          ) : (
            <div className="text-2xl">{activity?.type === 2 ? '🎵' : activity?.type === 3 ? '📺' : '🎮'}</div>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-black flex items-center justify-center text-[10px] shadow-lg">⚡</div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="w-2 h-2 rounded-full animate-pulse" 
            style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
          />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
            {activity ? (activity.type === 2 ? 'Listening to Spotify' : `Playing ${activity.name}`) : 'Current Status'}
          </span>
        </div>
        <p className="text-white font-semibold text-sm leading-none truncate">
          {activity?.details || statusText[status]}
        </p>
        <p className="text-slate-400 text-xs mt-1 truncate">
          {activity?.state || (data.discord_user.global_name || data.discord_user.username)}
        </p>
      </div>
      
      {activity?.timestamps && (
        <div className="text-right hidden sm:block">
          <div className="text-[10px] text-slate-500 font-mono tabular-nums">01:42 / 03:29</div>
        </div>
      )}
    </div>
  );
}
