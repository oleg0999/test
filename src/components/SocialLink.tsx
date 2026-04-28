/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full p-4 transition-all duration-300 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-600/20 hover:border-blue-500/30 group"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl text-xl group-hover:bg-blue-500/20 transition-colors">{icon}</span>
        <span className="font-semibold text-white tracking-tight">{label}</span>
      </div>
      <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition-all" />
    </motion.a>
  );
}
