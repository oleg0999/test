/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useLanyard } from './hooks/useLanyard';
import { DiscordRPC } from './components/DiscordRPC';
import { SocialLink } from './components/SocialLink';
import { MapPin } from 'lucide-react';

export default function App() {
  const { data } = useLanyard();

  const activities = data?.activities || [];
  const primaryActivity = activities.length > 0 ? activities[0] : null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 sm:p-8 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Video */}
      <div className="fixed inset-0 z-[-2]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="https://cdn.pixabay.com/video/2021/08/21/85863-591784961_large.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Background Overlays */}
      <div className="fixed inset-0 z-[-1] bg-[#05070a]/60 backdrop-blur-[1px]" />
      <div 
        className="fixed inset-0 z-[-1] opacity-30"
        style={{ 
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #1a233b 0%, transparent 40%), 
            radial-gradient(circle at 80% 80%, #0d121f 0%, transparent 40%)
          `
        }}
      />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[560px] w-full bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Header Section */}
        <div className="p-10 pb-6 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 relative">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-slate-900">
                <img
                  src={data?.discord_user.avatar ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=160` : `https://cdn.discordapp.com/embed/avatars/0.png`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Discord Status Indicator */}
              <div 
                className="absolute bottom-1 right-1 w-7 h-7 border-4 border-slate-900 rounded-full shadow-lg"
                style={{ 
                  backgroundColor: data ? (data.discord_status === 'online' ? '#23a55a' : data.discord_status === 'idle' ? '#faa81a' : data.discord_status === 'dnd' ? '#ed4245' : '#747f8d') : '#747f8d'
                }}
              ></div>
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-bold text-white tracking-tight">
            {data?.discord_user.global_name || 'dakovv'}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-widest">
              ✧ ♥Цавт танем♥ ✧
            </span>
            <span className="px-4 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-slate-400 text-xs font-medium flex items-center gap-1.5">
              <MapPin size={12} className="text-blue-400" /> Russia, Stavropol
            </span>
          </div>
        </div>

        {/* Presence Area */}
        <div className="px-10">
          <DiscordRPC data={data} />
        </div>

        {/* Links Grid */}
        <div className="flex-1 px-10 pb-6 flex flex-col gap-3">
          <SocialLink href="https://t.me/DakovvDen" icon="📱" label="Telegram" />
          <SocialLink href="https://github.com/oleg0999" icon="🐙" label="GitHub" />
          <SocialLink href="https://steamcommunity.com/id/ArmKitsun/" icon="🎮" label="Steam" />
          <SocialLink href="https://www.youtube.com/@Dakovvv-v2m" icon="📸" label="YouTube" />
          <SocialLink href="https://drive.google.com/drive/folders/1k3oMML1SEcCWAPcCDT-nNQ8oipL5t-JI?usp=drive_link" icon="💿" label="Google disk" />
        </div>

        {/* Footer Info */}
        <div className="mt-auto bg-black/60 py-4 px-10 border-t border-slate-800 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <span>Real-time Discord Status</span>
          <span className="text-blue-500">Built with Lanyard API</span>
        </div>
      </motion.div>
    </div>
  );
}
