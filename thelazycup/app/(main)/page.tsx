'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1f1208] text-white">

      {/* HERO */}
      <section className="relative flex items-center justify-center min-h-screen px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

        <div className="relative z-10 max-w-3xl text-center">
          <h2 className="uppercase tracking-widest text-sm text-amber-400 mb-4">
            Welcome to
          </h2>

          <h1 className="text-6xl font-extrabold mb-6">
            The Lazy Cup
          </h1>

          <p className="text-lg text-gray-300 mb-10">
            A modern café experience where premium coffee, tea, hookah,
            and comfort come together.
          </p>

          <div className="flex justify-center gap-5">
            <Link
              href="/menu"
              className="bg-amber-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition"
            >
              View Menu
            </Link>

            <Link
              href="/contact"
              className="border border-white/40 px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#2a1a0f] py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Why The Lazy Cup?
          </h2>
          <p className="text-gray-400 mb-14">
            Crafted for comfort, quality, and connection.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <Feature
              title="Premium Coffee"
              desc="Hand-crafted espresso drinks using carefully selected beans."
            />
            <Feature
              title="Relaxed Ambience"
              desc="Warm lighting, cozy seating, and calm vibes for every visit."
            />
            <Feature
              title="Hookah & Tea"
              desc="A wide selection of flavors to enjoy with friends."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Take a Break. Sip Slowly.
        </h2>
        <p className="text-gray-400 mb-8">
          Discover our carefully curated menu today.
        </p>

        <Link
          href="/menu"
          className="inline-block bg-amber-500 text-black px-10 py-3 rounded-full font-semibold hover:bg-amber-600 transition"
        >
          Explore Menu
        </Link>
      </section>

    </main>
  );
}

/* Feature Card */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#1f1208] border border-white/10 p-8 rounded-2xl text-left hover:border-amber-500/40 transition">
      <h3 className="text-xl font-semibold mb-3 text-amber-400">
        {title}
      </h3>
      <p className="text-gray-400">
        {desc}
      </p>
    </div>
  );
}
