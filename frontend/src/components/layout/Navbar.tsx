"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/businesses", label: "Browse Ideas" },
    { href: "/categories", label: "Categories" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100" style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>
      <div className="w-full max-w-[1400px] mx-auto px-8 xl:px-16">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-orange-200 group-hover:scale-105 transition-all duration-200">
              <span className="text-white font-black text-base tracking-tight">IN</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-extrabold text-gray-900 text-xl leading-tight">Business Matrix</p>
              <p className="text-[11px] text-orange-500 font-bold tracking-widest uppercase leading-tight">India • 3,320+ Ideas</p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href}
                  className={`relative px-6 py-3 rounded-xl font-semibold text-base transition-all duration-150 ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}>
                  {l.label}
                  {active && (
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <Link href="/businesses"
              className="hidden sm:inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-base font-bold px-7 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-200 hover:-translate-y-px">
              <Sparkles size={16} />
              Find Ideas
            </Link>
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
              onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1.5">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  active ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"
                }`}>
                {l.label}
                {active && <span className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />}
              </Link>
            );
          })}
          <Link href="/businesses" onClick={() => setOpen(false)}
            className="mt-2 bg-orange-600 text-white text-sm font-bold px-4 py-4 rounded-xl text-center shadow-md hover:bg-orange-700 transition-colors">
            Find Your Business Idea →
          </Link>
        </div>
      )}
    </nav>
  );
}