import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const Canvasref = useRef(null);

  useEffect(() => {
    const canvas = Canvasref.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 50;
    const colors = ["rgba(255,255,255,0.7)"];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 * 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleReSize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }
    handleReSize();
    window.addEventListener("resize" , handleReSize)

    let animationId;
    function animate() {
        ctx.clearRect(0 , 0,canvas.width , canvas.height);
        particles.forEach((p) => p.update());
        animationId = requestAnimationFrame(animate)
    }
    animate();

    return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener("resize" , handleReSize)
    }
  },[]);

  return (
    <div>
      <canvas
        ref={Canvasref}
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-0 "
      ></canvas>
    </div>
  );
};

export default ParticleBackground;
