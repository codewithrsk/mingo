import React from "react";
import api from "../config/Api.config";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const testApi = async () => {
    try {
      const req = await api.get("/");
      console.log(req.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-hidden">
      {/* ================= NAVBAR ================= */}
      {/* Your Header component can stay here */}

      {/* ================= HERO ================= */}
      <main>
        <section className="relative min-h-screen pt-32 pb-20 flex items-center">
          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1500 h-150 bg-primary/15 blur-[140px] rounded-full" />

            <div className="absolute bottom-0 right-0 w-100 h-100 bg-primary/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* ================= HERO CONTENT ================= */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm mb-7">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Simple. Private. Connected.
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Talk more.
                  <br />
                  <span className="text-primary">Worry less.</span>
                </h1>

                {/* Description */}
                <p className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed text-base-content/60">
                  Mingo is a simple and modern messaging platform built to bring
                  your conversations, friends, and communities together.
                </p>

                {/* Buttons */}
                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                  <button
                    className="btn btn-primary rounded-xl px-6"
                    onClick={() => navigate("/chat")}
                  >
                    Start chatting
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <button className="btn btn-outline rounded-xl px-6">
                    Explore Mingo
                  </button>
                </div>

                {/* Trust */}
                <div className="mt-9 flex flex-wrap items-center gap-6 text-sm text-base-content/50">
                  <div className="flex items-center gap-2">
                    <span className="text-success text-lg">✓</span>
                    Private conversations
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-warning text-lg">⚡</span>
                    Lightning fast
                  </div>
                </div>
              </div>

              {/* ================= CHAT PREVIEW ================= */}
              <div
                id="preview"
                className="relative lg:ml-auto w-full max-w-120"
              >
                {/* Glow */}
                <div className="absolute -inset-5 bg-primary/15 blur-3xl rounded-full" />

                {/* Chat Card */}
                <div className="relative rounded-3xl border border-base-300 bg-base-200 shadow-2xl overflow-hidden">
                  {/* ================= CHAT HEADER ================= */}
                  <div className="h-16 px-5 flex items-center justify-between border-b border-base-300 bg-base-100/50">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold">
                          A
                        </div>

                        {/* Online */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200" />
                      </div>

                      <div>
                        <p className="font-semibold text-sm">Alex Morgan</p>

                        <p className="text-xs text-success">Online</p>
                      </div>
                    </div>

                    {/* Chat Actions */}
                    <div className="flex items-center gap-1 text-base-content/60">
                      <button
                        className="btn btn-ghost btn-sm btn-square"
                        aria-label="Call"
                      >
                        ☎
                      </button>

                      <button
                        className="btn btn-ghost btn-sm btn-square"
                        aria-label="Video call"
                      >
                        ▶
                      </button>

                      <button
                        className="btn btn-ghost btn-sm btn-square text-xl"
                        aria-label="More"
                      >
                        ⋮
                      </button>
                    </div>
                  </div>

                  {/* ================= MESSAGES ================= */}
                  <div className="p-5 h-95 flex flex-col gap-4">
                    {/* Date */}
                    <div className="text-center text-xs text-base-content/40">
                      Today
                    </div>

                    {/* Received Message */}
                    <div className="flex items-end gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-content flex-shrink-0 flex items-center justify-center text-xs">
                        A
                      </div>

                      <div>
                        <div className="px-4 py-3 bg-base-300 rounded-2xl rounded-bl-md text-sm text-base-content max-w-65">
                          Hey! Are you free this evening?
                        </div>

                        <span className="block mt-1 text-[10px] text-base-content/40">
                          7:42 PM
                        </span>
                      </div>
                    </div>

                    {/* Sent Message */}
                    <div className="flex items-end justify-end">
                      <div>
                        <div className="px-4 py-3 bg-primary text-primary-content rounded-2xl rounded-br-md text-sm max-w-65">
                          Yeah! Let's catch up. 😊
                        </div>

                        <span className="flex items-center justify-end gap-1 mt-1 text-[10px] text-base-content/40">
                          7:43 PM
                          <span className="text-primary text-[11px]">✓✓</span>
                        </span>
                      </div>
                    </div>

                    {/* Received Message */}
                    <div className="flex items-end gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-content flex-shrink-0 flex items-center justify-center text-xs">
                        A
                      </div>

                      <div>
                        <div className="px-4 py-3 bg-base-300 rounded-2xl rounded-bl-md text-sm">
                          Perfect! I'll send you the location.
                        </div>

                        <span className="block mt-1 text-[10px] text-base-content/40">
                          7:44 PM
                        </span>
                      </div>
                    </div>

                    {/* Typing */}
                    <div className="mt-auto flex items-center gap-2 text-xs text-base-content/50">
                      <div className="flex gap-1 px-3 py-2 bg-base-300 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce" />

                        <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:150ms]" />

                        <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:300ms]" />
                      </div>
                      Alex is typing...
                    </div>
                  </div>

                  {/* ================= CHAT INPUT ================= */}
                  <div className="p-4 border-t border-base-300">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-base-300 border border-base-content/10">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="input input-ghost flex-1 bg-transparent outline-none text-sm"
                      />

                      <button
                        className="btn btn-primary btn-sm btn-square rounded-lg"
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
          className="py-24 border-t border-base-300 bg-base-100"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            {/* Section Header */}
            <div className="max-w-2xl mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                Why Mingo
              </p>

              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                Everything you need to stay connected.
              </h2>

              <p className="mt-5 text-base-content/60 text-lg">
                Mingo keeps communication simple while giving you the tools you
                need for meaningful conversations.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Feature 1 */}
              <div className="card border border-base-300 bg-base-200 hover:border-primary/40 transition">
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 text-2xl">
                    💬
                  </div>

                  <h3 className="card-title text-lg">Instant messaging</h3>

                  <p className="text-sm leading-relaxed text-base-content/50">
                    Send messages instantly and keep every conversation flowing.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card border border-base-300 bg-base-200 hover:border-primary/40 transition">
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 text-2xl">
                    👥
                  </div>

                  <h3 className="card-title text-lg">Group chats</h3>

                  <p className="text-sm leading-relaxed text-base-content/50">
                    Create groups and bring friends, teams, and communities
                    together.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card border border-base-300 bg-base-200 hover:border-success/40 transition">
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center mb-3 text-2xl">
                    🛡
                  </div>

                  <h3 className="card-title text-lg">Private by design</h3>

                  <p className="text-sm leading-relaxed text-base-content/50">
                    Your conversations are yours. Mingo puts privacy at the
                    center.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="card border border-base-300 bg-base-200 hover:border-warning/40 transition">
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center mb-3 text-2xl">
                    ⚡
                  </div>

                  <h3 className="card-title text-lg">Fast & reliable</h3>

                  <p className="text-sm leading-relaxed text-base-content/50">
                    A smooth messaging experience designed to feel instant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section id="about" className="py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 p-8 sm:p-14 text-center">
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/20 blur-[80px]" />

              <div className="relative">
                {/* Icon */}
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary text-primary-content flex items-center justify-center shadow-xl text-2xl">
                  💬
                </div>

                <h2 className="mt-7 text-4xl sm:text-5xl font-bold">
                  Ready to start talking?
                </h2>

                <p className="mt-5 max-w-xl mx-auto text-base-content/60 text-lg">
                  Join Mingo and experience a cleaner, faster, and more
                  enjoyable way to chat.
                </p>

                <button
                  className="btn btn-primary mt-8 rounded-xl px-7"
                  onClick={() => navigate("/register")}
                >
                  Create your account
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
