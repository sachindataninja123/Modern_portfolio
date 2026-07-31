import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

// Desktop Images
import pro1 from "../assets/pro1.png";
import pro2 from "../assets/pro2.png";
import pro3 from "../assets/pro3.png";
import pro4 from "../assets/pro4.png";

// Mobile Images
import promob1 from "../assets/promob1.png";
import promob2 from "../assets/promob2.png";
import promob3 from "../assets/promob3.png";
import promob4 from "../assets/promob4.png";

const useIsMobile = (query = "(max-width : 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
};

const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "HireMindAI",
        description:
          "AI-driven platform for automated technical & HR interview preparation with real-time feedback.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Web Speech API"],
        link: "https://hiremindai1-client.onrender.com/",
        Code: "https://github.com/sachindataninja123/HireMindAI",
        bgColor: "#2A1F3D", // Light Rose
        image: isMobile ? promob1 : pro1,
      },
      {
        title: "TableTap",
        description:
          "SaaS platform for restaurant discovery, real-time table booking, and automated seat holds.",
        tags: ["React", "Redux Toolkit", "Node.js", "MongoDB", "node-cron"],
        link: "https://tabletap-1.onrender.com/",
        Code: "https://github.com/sachindataninja123/TableTap",
        bgColor: "#1E2D3D", // Light Cream
        image: isMobile ? promob2 : pro2,
      },
      {
        title: "Nex Ride",
        description:
          "Cab booking app connecting rider and captain with live location and OTP-verified rides.",
        tags: ["Node.js", "Express", "Socket.IO", "MongoDB", "Google Maps"],
        link: "https://github.com/sachindataninja123/NexRide-cab_booking_app",
        Code: "https://github.com/sachindataninja123/NexRide-cab_booking_app",
        bgColor: "#1E3A35", // Light Mint/Sage
        image: isMobile ? promob3 : pro3,
      },
      {
        title: "StreamHub",
        description:
          "Video-sharing social platform with streaming, playlists, channel subscriptions, and real-time alerts.",
        tags: ["React", "Redux Toolkit", "Express 5", "MongoDB", "Cloudinary"],
        link: "https://streamhub-frontend-8r5z.onrender.com/",
        Code: "https://github.com/sachindataninja123/streamhub",
        bgColor: "#3A2424", // Light Lavender
        image: isMobile ? promob4 : pro4,
      },
    ],
    [isMobile],
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIdx(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIdx];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-gray-900 transition-colors duration-500 ease-out"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* Section Heading */}
        <h2
          className={`text-3xl font-semibold z-10 text-center text-gray-100 ${
            isMobile ? "mt-4" : "mt-6"
          }`}
        >
          My Work
        </h2>

        {/* Sticky Carousel Viewport */}
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isActive
                    ? "opacity-100 z-20 pointer-events-auto"
                    : "opacity-0 z-0 sm:z-10 pointer-events-none"
                }`}
                style={{ width: "85%", maxWidth: "1200px" }}
              >
                {/* Header Overlay: Title + Description + Tags */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: -25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`block sm:absolute sm:-top-28 sm:left-[2%] lg:left-[-2%] sm:mb-0 max-w-2xl ${
                        isMobile ? "-mt-24 text-center" : "text-left"
                      }`}
                      style={{ zIndex: 5 }}
                    >
                      {/* Project Title */}
                      <h3 className="text-[clamp(1.8rem,5vw,4.2rem)] text-gray-100 italic font-semibold leading-tight drop-shadow-sm">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-sm sm:text-base text-gray-200 font-medium mt-1 mb-5 line-clamp-2">
                        {project.description}
                      </p>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Image Frame */}
                <div
                  className={`relative w-full overflow-hidden md:mt-4 bg-white/70 backdrop-blur-md shadow-2xl border border-black/5 md:shadow-[0_20px_50px_rgba(0,0,0,0.12)] ${
                    isMobile ? "mb-b rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                  } h-[58vh] sm:h-[62vh]`}
                  style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{
                      position: "relative",
                      zIndex: 10,
                    }}
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      zIndex: 11,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 40%)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Buttons */}
        <div
          className={`flex gap-5 items-center absolute ${
            isMobile ? "bottom-12" : "bottom-5"
          }`}
          style={{ zIndex: 30 }}
        >
          <div>
            <a
              href={activeProject?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:scale-105"
              aria-label={`View ${activeProject?.title}`}
            >
              View Project
            </a>
          </div>

          <div>
            <a
              href={activeProject?.Code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold rounded-lg bg-white border border-gray-300 text-gray-900 hover:bg-gray-100 transition-all shadow-md hover:shadow-lg hover:scale-105"
              aria-label={`View Code for ${activeProject?.title}`}
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;