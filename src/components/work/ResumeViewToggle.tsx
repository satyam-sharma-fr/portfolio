"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, FileText, Download } from "lucide-react";

const tabs = [
  { label: "Creative", href: "/work", icon: Sparkles },
  { label: "Resume", href: "/resume", icon: FileText },
] as const;

export function ResumeViewToggle() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-4 pt-5 pb-2">
      <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 border border-neutral-200 shadow-sm">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
      <a
        href="/resume.pdf"
        download
        className="flex items-center gap-1.5 text-[13px] text-neutral-400 hover:text-neutral-600 transition-colors font-medium"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Download PDF</span>
      </a>
    </div>
  );
}
