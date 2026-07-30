import React, { useEffect, useRef, useState } from "react";
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import {
  SiTypescript,
  SiDocker,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiBootstrap,
  SiTailwindcss,
  SiRedux,
  SiSocketdotio,
  SiJsonwebtokens,
  SiGit,
  SiGithub,
  SiPostman,
  SiVite,
  SiFramer,
  SiGreensock,
  SiCloudinary,
} from "react-icons/si";
import { motion, useMotionValue } from "framer-motion";

const Skills = () => {
  // Row 1 Skills: Frontend, UI & Design
  const row1Skills = [
    { name: "React.js", icon: <FaReact /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "JavaScript", icon: <FaJsSquare /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Bootstrap", icon: <SiBootstrap /> },
    { name: "Redux Toolkit", icon: <SiRedux /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "Framer Motion", icon: <SiFramer /> },
    { name: "GSAP", icon: <SiGreensock /> },
  ];

  // Row 2 Skills: Backend, Databases, DevOps & Tools
  const row2Skills = [
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "Socket.IO", icon: <SiSocketdotio /> },
    { name: "JWT", icon: <SiJsonwebtokens /> },
    { name: "Cloudinary", icon: <SiCloudinary /> },
    { name: "Git", icon: <SiGit /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "Vite", icon: <SiVite /> },
    { name: "C++", icon: <TbBrandCpp /> },
    { name: "Java", icon: <FaJava /> },
  ];

  const repeatedRow1 = [...row1Skills, ...row1Skills];
  const repeatedRow2 = [...row2Skills, ...row2Skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);

  const trackRef1 = useRef(null);
  const trackRef2 = useRef(null);

  const touchY = useRef(null);

  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  // Intersection Observer to run animation only when visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll and touch listeners to change direction dynamically
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // Animation Loop for Dual Tracks
  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 70;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      const loop1 = trackRef1.current?.scrollWidth / 2 || 0;
      const loop2 = trackRef2.current?.scrollWidth / 2 || 0;

      // Row 1 Motion (Moves Left by default when dir = -1)
      let next1 = x1.get() + SPEED * dir * dt;
      if (loop1) {
        if (next1 <= -loop1) next1 += loop1;
        if (next1 >= 0) next1 -= loop1;
      }
      x1.set(next1);

      // Row 2 Motion (Moves Right by default when dir = -1)
      let next2 = x2.get() - SPEED * dir * dt;
      if (loop2) {
        if (next2 >= 0) next2 -= loop2;
        if (next2 <= -loop2) next2 += loop2;
      }
      x2.set(next2);

      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x1, x2]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-[70vh] py-16 w-full flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        My Skills
      </motion.h2>
      <motion.p
        className="mt-2 mb-12 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* Skills Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-10 z-10">
        
        {/* Row 1: Leftward Scrolling */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef1}
            className="flex gap-10 text-5xl sm:text-6xl text-[#1cd8d2]"
            style={{ x: x1, whiteSpace: "nowrap", willChange: "transform" }}
          >
            {repeatedRow1.map((skill, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 min-w-32"
                aria-label={skill.name}
                title={skill.name}
              >
                <span className="hover:scale-125 transition-transform duration-300 cursor-pointer">
                  {skill.icon}
                </span>
                <p className="text-xs sm:text-sm text-white/80">{skill.name}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Rightward Scrolling */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef2}
            className="flex gap-10 text-5xl sm:text-6xl text-[#00bf8f]"
            style={{ x: x2, whiteSpace: "nowrap", willChange: "transform" }}
          >
            {repeatedRow2.map((skill, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 min-w-32"
                aria-label={skill.name}
                title={skill.name}
              >
                <span className="hover:scale-125 transition-transform duration-300 cursor-pointer">
                  {skill.icon}
                </span>
                <p className="text-xs sm:text-sm text-white/80">{skill.name}</p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Skills;