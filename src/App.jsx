import React, { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Home from "./sections/Home";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

const App = () => {
  const [introdone, setIntroDone] = useState(false);

  return (
    <>
      {!introdone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introdone && (
        <div className="relative gradients">
          <CustomCursor />
          {/* <ParticleBackground /> */}

          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
