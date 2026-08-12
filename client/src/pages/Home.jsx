import React from "react";

const Home = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* ================= NAVBAR ================= */}
      

      {/* ================= HERO ================= */}
      <main>
        <section className="relative min-h-screen pt-32 pb-20 flex items-center">

          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[140px] rounded-full" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Hero Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300 text-sm mb-7">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  Simple. Private. Connected.
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Talk more.
                  <br />

                  <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Worry less.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-400">
                  Mingo is a simple and modern messaging platform built to
                  bring your conversations, friends, and communities together.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                  <button className="group px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 font-semibold transition flex items-center justify-center gap-2 shadow-xl shadow-violet-600/20">
                    Start chatting

                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <button className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-semibold transition">
                    Explore Mingo
                  </button>
                </div>

                {/* Trust */}
                <div className="mt-9 flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-lg">✓</span>
                    Private conversations
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">⚡</span>
                    Lightning fast
                  </div>
                </div>
              </div>

              {/* Chat Preview */}
              <div
                id="preview"
                className="relative lg:ml-auto w-full max-w-[480px]"
              >
                {/* Glow */}
                <div className="absolute -inset-5 bg-violet-600/20 blur-3xl rounded-full" />

                <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/40 overflow-hidden">

                  {/* Chat Header */}
                  <div className="h-16 px-5 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center font-semibold">
                          A
                        </div>

                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
                      </div>

                      <div>
                        <p className="font-semibold text-sm">
                          Alex Morgan
                        </p>

                        <p className="text-xs text-emerald-400">
                          Online
                        </p>
                      </div>
                    </div>

                    {/* Chat Actions */}
                    <div className="flex items-center gap-1 text-slate-400">

                      <button
                        className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg text-lg"
                        aria-label="Call"
                      >
                        ☎
                      </button>

                      <button
                        className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg text-lg"
                        aria-label="Video call"
                      >
                        ▶
                      </button>

                      <button
                        className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-lg text-xl"
                        aria-label="More"
                      >
                        ⋮
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-5 h-[380px] flex flex-col gap-4">

                    {/* Date */}
                    <div className="text-center text-xs text-slate-600">
                      Today
                    </div>

                    {/* Received */}
                    <div className="flex items-end gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex-shrink-0 flex items-center justify-center text-xs">
                        A
                      </div>

                      <div>
                        <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-bl-md text-sm text-slate-200 max-w-[260px]">
                          Hey! Are you free this evening?
                        </div>

                        <span className="block mt-1 text-[10px] text-slate-600">
                          7:42 PM
                        </span>
                      </div>
                    </div>

                    {/* Sent */}
                    <div className="flex items-end justify-end">
                      <div>
                        <div className="px-4 py-3 bg-violet-600 rounded-2xl rounded-br-md text-sm max-w-[260px]">
                          Yeah! Let's catch up. 😊
                        </div>

                        <span className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-600">
                          7:43 PM

                          <span className="text-violet-400 text-[11px]">
                            ✓✓
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Received */}
                    <div className="flex items-end gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex-shrink-0 flex items-center justify-center text-xs">
                        A
                      </div>

                      <div>
                        <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-bl-md text-sm">
                          Perfect! I'll send you the location.
                        </div>

                        <span className="block mt-1 text-[10px] text-slate-600">
                          7:44 PM
                        </span>
                      </div>
                    </div>

                    {/* Typing */}
                    <div className="mt-auto flex items-center gap-2 text-xs text-slate-500">

                      <div className="flex gap-1 px-3 py-2 bg-slate-800 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:300ms]" />
                      </div>

                      Alex is typing...
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-white/5">

                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent px-2 outline-none text-sm text-white placeholder:text-slate-500"
                      />

                      <button
                        className="w-9 h-9 rounded-lg bg-violet-600 hover:bg-violet-500 flex items-center justify-center transition text-base"
                        aria-label="Send message"
                      >
                        ➤
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section
          id="features"
          className="py-24 border-t border-white/5 bg-slate-950"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8">

            <div className="max-w-2xl mb-14">
              <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest">
                Why Mingo
              </p>

              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                Everything you need to stay connected.
              </h2>

              <p className="mt-5 text-slate-400 text-lg">
                Mingo keeps communication simple while giving you the tools
                you need for meaningful conversations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Feature 1 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition">

                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-6 text-2xl">
                  💬
                </div>

                <h3 className="text-lg font-semibold">
                  Instant messaging
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Send messages instantly and keep every conversation flowing.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-500/30 transition">

                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 text-2xl">
                  👥
                </div>

                <h3 className="text-lg font-semibold">
                  Group chats
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Create groups and bring friends, teams, and communities
                  together.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition">

                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 text-2xl">
                  🛡
                </div>

                <h3 className="text-lg font-semibold">
                  Private by design
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Your conversations are yours. Mingo puts privacy at the
                  center.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-yellow-500/30 transition">

                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 text-2xl">
                  ⚡
                </div>

                <h3 className="text-lg font-semibold">
                  Fast & reliable
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  A smooth messaging experience designed to feel instant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section id="about" className="py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-8 sm:p-14 text-center">

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-violet-500/20 blur-[80px]" />

              <div className="relative">

                <div className="mx-auto w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center shadow-xl shadow-violet-600/30 text-2xl">
                  💬
                </div>

                <h2 className="mt-7 text-4xl sm:text-5xl font-bold">
                  Ready to start talking?
                </h2>

                <p className="mt-5 max-w-xl mx-auto text-slate-400 text-lg">
                  Join Mingo and experience a cleaner, faster, and more
                  enjoyable way to chat.
                </p>

                <button className="mt-8 px-7 py-3.5 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition inline-flex items-center gap-2">
                  Create your account

                  <span className="text-lg">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-lg">
                💬
              </div>

              <span className="text-xl font-bold">
                mingo<span className="text-violet-400">.</span>
              </span>
            </div>

            <p className="text-sm text-slate-600">
              © 2026 Mingo. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-sm text-slate-500">
              <a
                href="#"
                className="hover:text-white transition"
              >
                Privacy
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Terms
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Contact
              </a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;