import {
  animate,
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React, { useEffect, useRef, useState, useMemo } from "react";
import project3 from "../assets/project3.png";
import project3mob from "../assets/project3mob.png";
import project1mob from "../assets/project1mob.png";
import project2 from "../assets/project2.png"
import shoeWeb from "../assets/shoeweb.png";

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
        title: "College Event Hub",
        link: "https://drive.google.com/file/d/1NTlAsr1CL2gejRJCe-g1TQtfkhYcSCA_/view",
        Code: "https://github.com/sachindataninja123/campus-event-hub",
        bgColor: "#5d4141",
        image: isMobile ? project2 : project2,
      },
      {
        title: "Shoe Web Frontend",
        link: "https://stepwalk.netlify.app/",
        Code: "https://github.com/sachindataninja123/shoesWebFrontend",
        bgColor: "#f09e12",
        image: isMobile ? project1mob : shoeWeb, // use mobile or desktop image
      },
      {
        title: "Sundown Clone",
        link: "https://sunredown.netlify.app/",
        Code: "https://github.com/sachindataninja123/Sundown",
        bgColor: "#5e5e5d",

        image: isMobile ? project3mob : project3,
      },
    ],
    [isMobile], // re-run only when `isMobile` changes
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
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease ",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}
        >
          My Work
        </h2>
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}
        >
          {projects.map((projects, idx) => {
            return (
              <div
                key={idx}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIdx === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10 "}`}
                style={{ width: "85%", maxWidth: "1200px" }}
              >
                <AnimatePresence mode="wait">
                  {activeIdx === idx && (
                    <motion.h3
                      key={projects.title}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${
                        isMobile ? "-mt-24" : ""
                      }`}
                      style={{
                        zIndex: 5,
                        textAlign: isMobile ? "center" : "left",
                      }}
                    >
                      {projects.title}
                    </motion.h3>
                  )}
                </AnimatePresence>

                <div
                  className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                    isMobile ? "mb-b rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                  }
                h-[62vh] sm:h-[66vh]`}
                  style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
                >
                  <img
                    src={projects.image}
                    alt={projects.title}
                    className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      filter: "drop-shadow(0,16px 40px rgba(0,0,0,0.65))",
                      transition: "filter 200ms ease",
                    }}
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      zIndex: 11,
                      background:
                        "linear-gradient(180deg , rbga(0,0,0,0.12) 0% , rgba(0,0,0,0) 40%)",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`flex gap-5 items-center absolute ${isMobile ? "bottom-15" : "bottom-5"}`}
        >
          <div>
            <a
              href={activeProject?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
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
              className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
              aria-label={`View ${activeProject?.title}`}
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
