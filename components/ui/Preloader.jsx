"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ finishLoading }) {
  const [text, setText] = useState("INITIALIZING");

  useEffect(() => {
    const texts = [
      "INITIALIZING",
      "LOADING ASSETS",
      "CONNECTING",
      "READY"
    ];
    let i = 0;

    const interval = setInterval(() => {
      setText(texts[i]);
      i++;
      if (i >= texts.length) {
        clearInterval(interval);
        setTimeout(finishLoading, 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -100,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* 3D Spinner Effect using CSS */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-t-[#00f0ff] border-r-transparent border-b-[#bd00ff] border-l-transparent rounded-full animate-spin" />
        <div className="absolute inset-2 border-4 border-t-[#bd00ff] border-r-transparent border-b-[#00f0ff] border-l-transparent rounded-full animate-spin-reverse opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-[#00f0ff] animate-pulse text-xl">
          SK
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-mono tracking-[0.3em] text-[#00f0ff]"
        >
          {text}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-20 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00f0ff] to-[#bd00ff]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
