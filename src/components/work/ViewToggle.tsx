"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, FileText } from "lucide-react";

const tabs = [
  { label: "Creative", href: "/work", icon: Sparkles },
  { label: "Resume", href: "/resume", icon: FileText },
] as const;

export function ViewToggle() {
  const pathname = usePathname();

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-white/60 hover:text-white/90"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
