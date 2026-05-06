import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 160;
const COLOR = 'rgba(255, 207, 64,';

const ThreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let w = 0, h = 0;
    let time = 0;

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Init particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
    }));

    // Pause when off-screen
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visible) return;

      time += 0.005;
      ctx.clearRect(0, 0, w, h);

      const cosT = Math.cos(time * 0.05);
      const sinT = Math.sin(time * 0.03);

      for (const p of particles.current) {
        // Slowly rotate in 3D (cheap 2D projection)
        const rx = p.x * cosT - p.z * sinT;
        const ry = p.y;
        const rz = p.x * sinT + p.z * cosT + 1.5; // keep z positive
        const scale = 5 / rz;

        const sx = (rx * scale * 0.5 + 0.5) * w;
        const sy = (ry * scale * 0.5 + 0.5) * h;
        const size = Math.max(0.5, scale * 0.012 * w * 0.01);
        const opacity = Math.min(0.7, scale * 0.15);

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `${COLOR}${opacity})`;
        ctx.fill();

        // Drift
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > 1) p.x = -1;
        if (p.x < -1) p.x = 1;
        if (p.y > 1) p.y = -1;
        if (p.y < -1) p.y = 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
};

export default ThreeBackground;
