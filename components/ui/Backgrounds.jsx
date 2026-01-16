"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// 1. HOME: Warp Speed Starfield (Canvas - High Performance)
export const WarpBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 400 }).map(() => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * 2000,
    }));

    const animate = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.z -= 10;
        if (star.z <= 0) {
          star.z = 2000;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const scale = 500 / star.z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;
        const size = scale * 2;

        const alpha = 1 - star.z / 2000;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// 2. ABOUT/SKILLS: Particle Network (Canvas)
export const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-carbon pointer-events-none" />;
};

// 3. CONTACT: Aurora Background
export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 bg-carbon z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-neon-cyan/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[150px]"
      />
    </div>
  );
};

// 4. Grid Background (Simple CSS version for lighter pages)
export const GridBackground = () => {
  return (
    <div className="fixed inset-0 bg-carbon z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Moving Light Beams */}
      <motion.div
        animate={{ opacity: [0, 0.5, 0], top: ['0%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute left-[20%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-neon-cyan to-transparent"
      />
      <motion.div
        animate={{ opacity: [0, 0.5, 0], top: ['0%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute right-[30%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-neon-blue to-transparent"
      />
      <motion.div
        animate={{ opacity: [0, 0.3, 0], top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute left-[60%] w-[1px] h-[150px] bg-gradient-to-b from-transparent via-neon-purple to-transparent"
      />
    </div>
  );
};
