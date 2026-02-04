"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-transition"
        initial={{
          clipPath: "inset(50% 0 50% 0)",
          opacity: 0,
        }}
        animate={{
          clipPath: "inset(0 0 0 0)",
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="min-h-screen bg-[#081A3A]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
