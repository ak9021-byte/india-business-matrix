import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Browse Ideas", href: "/businesses" },
    { label: "Categories", href: "/categories" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 pt-12 pb-8 mt-0">
      <div className="max-w-5xl mx-auto px-6">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-gray-800">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
              IN
            </div>
            <div>
              <p className="font-bold text-white text-sm">India Business Matrix</p>
              <p className="text-xs text-gray-500">3,320+ ideas across 225+ categories</p>
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} India Business Strategy Matrix. All rights reserved.</p>
          <p className="text-orange-600/70 font-medium">🇮🇳 Built for Indian entrepreneurs</p>
        </div>

      </div>
    </footer>
  );
}