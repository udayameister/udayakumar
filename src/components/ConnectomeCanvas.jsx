import { useEffect, useRef } from "react";

const nodes = [
  [0.12, 0.28],
  [0.25, 0.18],
  [0.42, 0.31],
  [0.62, 0.2],
  [0.78, 0.34],
  [0.2, 0.58],
  [0.38, 0.72],
  [0.58, 0.62],
  [0.76, 0.73],
  [0.88, 0.52]
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [2, 5],
  [2, 7],
  [3, 7],
  [4, 9],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [1, 6],
  [4, 7]
];

export default function ConnectomeCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animationId;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const points = nodes.map(([x, y], index) => ({
        x: x * rect.width + Math.sin(frame / 45 + index) * 7,
        y: y * rect.height + Math.cos(frame / 52 + index) * 7
      }));

      ctx.lineWidth = 1.3;
      edges.forEach(([a, b], index) => {
        const pulse = 0.35 + Math.sin(frame / 22 + index) * 0.18;
        ctx.strokeStyle = `rgba(15, 118, 110, ${pulse})`;
        ctx.beginPath();
        ctx.moveTo(points[a].x, points[a].y);
        ctx.lineTo(points[b].x, points[b].y);
        ctx.stroke();
      });

      points.forEach((point, index) => {
        const radius = 4 + Math.sin(frame / 18 + index) * 1.5;
        ctx.fillStyle = index % 3 === 0 ? "#b7791f" : index % 3 === 1 ? "#0f766e" : "#7f1d46";
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      frame += 1;
      animationId = window.requestAnimationFrame(draw);
    };

    draw();
    return () => window.cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={ref}
      className="h-full min-h-[320px] w-full border border-ink/10 bg-white/70 shadow-soft dark:border-white/10 dark:bg-white/5"
      style={{ borderRadius: 8 }}
      aria-label="Animated connectome network visualization"
    />
  );
}
