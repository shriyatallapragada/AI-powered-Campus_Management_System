"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Briefcase,
  Compass,
  Building2,
  MessageSquare,
  User,
  Search,
  Bell,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/academics", label: "Academics", icon: BookOpen },
  { href: "/placements", label: "Placements", icon: Briefcase },
  { href: "/opportunities", label: "Opportunities", icon: Compass },
  { href: "/campus", label: "Campus", icon: Building2 },
  { href: "/community", label: "Community", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white border-r border-slate-100 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-base">College Hub</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="w-4.5 h-4.5 shrink-0 w-[18px] h-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Profile link */}
      <div className="px-3 pb-4 border-t border-slate-100 pt-3">
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            pathname.startsWith("/profile")
              ? "bg-indigo-50 text-indigo-700"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <User className="w-[18px] h-[18px] shrink-0" />
          My Profile
        </Link>
      </div>
    </aside>
  );
}

export function TopBar() {
  const pathname = usePathname();

  const currentLabel =
    navItems.find(({ href }) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href)
    )?.label ?? "Profile";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-100 h-14 flex items-center px-4 lg:pl-64 gap-4">
      {/* Mobile: page title */}
      <span className="font-semibold text-slate-800 lg:hidden">{currentLabel}</span>

      {/* Search bar */}
      <Link
        href="/search"
        className="flex-1 max-w-xl flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-sm hover:border-indigo-300 transition-colors cursor-text"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span>Search anything — subjects, viva questions, companies…</span>
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold">
            U
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
        </Link>
      </div>
    </header>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 flex items-center justify-around px-2 py-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              isActive ? "text-indigo-600" : "text-slate-500"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden xs:block">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
