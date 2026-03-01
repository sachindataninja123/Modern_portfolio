import React, { useEffect, useMemo, useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { motion, scale } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import avator from "../assets/avator.png";

const socials = [
  {
    Icon: <FaGithub />,
    label: "Github",
    href: "https://github.com/sachindataninja123",
  },
  {
    Icon: <FaLinkedin />,
    label: "Linkedin",
    href: "https://www.linkedin.com/in/sachikushwaha/",
  },
  {
    Icon: <FaInstagram />,
    label: "Insta",
    href: "https://www.instagram.com/its_you178/?hl=en",
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0 ,0 ,0 , 0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8)) ",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Home = () => {
  const roles = useMemo(() => ["Frontend Developer", "Web Developer"], []);

  const [index, setIndex] = useState(0);
  const [subIndex, setsubIndex] = useState(0);
  const [deleting, setDeleting] = useState(0);

  useEffect(() => {
    const current = roles[index];
    const timeOut = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setsubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setsubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );
    return () => clearTimeout(timeOut);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative overflow-hidden bg-black"
    >
      <ParticleBackground />
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 w-[70vw] sm:w-[z-500] md:w-[40vw] h-[70w] sm:h-[50vw] md:h-[40vw]
      max-w-125 max-h-125 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-[70vw] sm:w-[z-500] md:w-[40vw] h-[70w] sm:h-[50vw] md:h-[40vw]
      max-w-125 max-h-125 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"
        ></div>
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-3xl">
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6rem]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-0.5 ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              ></span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I'm
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[86px] lg:whitespace-nowrap">
                Sachin Kushwaha
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 "
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I turn complex ideas into seamless, high-impact web experiences -
              building modern , scalable , and lightning-fast applications that
              make a difference.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-lg text-white  bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg   hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                 href="/Resume.pdf"
                target="_blank"
                className="px-6 py-3 rounded-full text-black bg-white font-medium transition-all hover:scale-105"
              >
                My Resume
              </a>
            </motion.div>
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => {
                return (
                  <motion.a
                    href={href}
                    target="_blank"
                    key={label}
                    aria-label={label}
                    rel="noopener noreferrer"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-gray-300"
                  >
                    {Icon}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw , 410px)",
              height: "min(40vw , 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg , #1cd8d2 , #00bf8f , #302b63 , #1cd8d2)",
            }}
          />
          <motion.img
            src={avator}
            alt="sachin"
            className="absolute top-1/2  -translate-y-1/2 object-contain select-none pointer-events-none "
            style={{
              right: "-50px",
              width: "min(45vw , 780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
