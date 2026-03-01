import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiCrossMark } from "react-icons/gi";

const Overlay = ({ isOpen, onClose }) => {

  const origin = "95% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0 , 0 ,0 ,0.90)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-10 text-red-500 text-4xl active:scale-95 cursor-pointer"
          >
            <GiCrossMark />
          </button>

          <ul className="space-y-4 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Contact",
            ].map((item, idx) => {
              return (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="text-3xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
