import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const conversation = [
  { from: "them", name: "Aisha", text: "hey! did the designs get to you?" },
  { from: "me", text: "just opened them now 👀" },
  { from: "them", name: "Aisha", text: "take your time, no rush" },
  { from: "me", text: "these are really clean, love the gradient" },
  
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function ChatMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function play() {
      for (let i = 0; i < conversation.length; i++) {
        setTyping(true);
        await new Promise((r) => setTimeout(r, 700));
        if (cancelled) return;
        setTyping(false);
        setVisibleCount((c) => c + 1);
        await new Promise((r) => setTimeout(r, 350));
      }
    }

    play();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      {/* soft floating gradient blobs behind the device */}
      <motion.div
        className="absolute -top-10 -right-8 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-400 to-sky-300 opacity-30 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-sky-300 to-violet-400 opacity-25 blur-3xl"
        animate={{ y: [0, -14, 0], x: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* device frame */}
      <div className="relative w-full max-w-sm rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-xl shadow-indigo-100 backdrop-blur">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-semibold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Aisha</p>
            <p className="text-xs text-slate-400">online</p>
          </div>
        </div>

        <div className="flex min-h-[280px] flex-col justify-end gap-2 pt-4">
          <AnimatePresence>
            {conversation.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${
                  msg.from === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                    msg.from === "me"
                      ? "rounded-br-sm bg-gradient-to-br from-indigo-500 to-sky-500 text-white"
                      : "rounded-bl-sm bg-slate-100 text-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2">
          <span className="flex-1 text-sm text-slate-400">Message Aisha…</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5 text-white"
            >
              <path
                d="M4 12h16m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500" />
          <span className="text-lg font-bold text-slate-900">Loop</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-10 md:grid-cols-2 md:pt-16">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium text-indigo-500"
          >
            Real conversations, kept simple
          </motion.p>
          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl"
          >
            Messages that feel as fast as you think.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base leading-relaxed text-slate-500"
          >
            Loop keeps every conversation close, quick to reach, and free of
            clutter — one clean thread for the people you actually talk to.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <Link
              to="/signup"
              className="rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:opacity-90"
            >
              Start chatting
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              I already have an account
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ChatMockup />
        </motion.div>
      </section>

      <section className="border-t border-slate-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3">
          {[
            {
              title: "Instant delivery",
              body: "Messages land the moment you send them, no spinner in sight.",
            },
            {
              title: "Read, not guessed",
              body: "Know exactly when someone's seen what you sent.",
            },
            {
              title: "Yours, privately",
              body: "End-to-end encryption on every thread, by default.",
            },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="text-sm font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
