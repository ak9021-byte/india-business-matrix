import Link from "next/link";

const stats = [
  { value: "3,320+", label: "Business Ideas", icon: "💡" },
  { value: "225+", label: "Categories", icon: "📂" },
  { value: "4", label: "Investment Scales", icon: "💰" },
  { value: "All India", label: "States Covered", icon: "🗺️" },
];

const features = [
  {
    icon: "📊",
    title: "Investment Breakdown",
    desc: "Every idea comes with min capital, people required, and exact cost ranges — no guesswork.",
  },
  {
    icon: "🏛️",
    title: "Govt Schemes & Docs",
    desc: "Know exactly which licences to get and which schemes can fund your idea.",
  },
  {
    icon: "📈",
    title: "Profitability Insights",
    desc: "Market potential, scalability rating, and difficulty level rated for every business.",
  },
  {
    icon: "🔍",
    title: "Smart Filtering",
    desc: "Filter by investment scale, category, difficulty level, or business type instantly.",
  },
];

const categories = [
  "Agriculture", "Food & Beverage", "Technology", "Manufacturing",
  "Healthcare", "Education", "Retail", "Services",
];

export default function Home() {
  return (
    <div className="bg-[#fafaf8]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c2410c] via-[#ea580c] to-[#f97316] text-white">
        {/* decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-white/15 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            🇮🇳 Made for Indian Entrepreneurs
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Find Your Next<br />
            <span className="text-orange-200">Business Idea</span>
          </h1>

          <p className="text-lg sm:text-xl text-orange-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            3,320+ vetted business ideas across 225 categories — with real investment figures,
            government schemes, difficulty ratings, and profitability insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/businesses"
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base">
              Browse All Ideas →
            </Link>
            <Link href="/categories"
              className="border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base backdrop-blur-sm">
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label}
              className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-2xl font-extrabold text-orange-600">{s.value}</div>
              <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-widest mb-2">Why Use This</p>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Everything you need to start smart
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-5">
              <div className="text-3xl shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES STRIP ── */}
      <section className="bg-orange-50 border-y border-orange-100 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-widest mb-6">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <Link key={c} href={`/categories`}
                className="bg-white border border-orange-200 text-orange-700 font-medium px-5 py-2 rounded-full text-sm hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                {c}
              </Link>
            ))}
            <Link href="/categories"
              className="bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-orange-700 transition-all shadow-sm">
              View All 225+ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 shadow-xl">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Ready to Begin?</p>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Find your perfect business idea today
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Filter by investment amount, difficulty level, market potential,
            and more — all in one place.
          </p>
          <Link href="/businesses"
            className="inline-block bg-orange-500 text-white font-bold px-10 py-4 rounded-xl hover:bg-orange-400 transition-all shadow-lg hover:-translate-y-0.5 text-base">
            Start Exploring →
          </Link>
        </div>
      </section>

    </div>
  );
}