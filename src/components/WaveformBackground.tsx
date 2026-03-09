import { useEffect, useRef } from "react";

const WaveformBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const baseY = canvas.height * 0.5 + wave * 30;
        const amplitude = 20 + wave * 10;
        const frequency = 0.008 + wave * 0.003;
        const alpha = 0.08 - wave * 0.02;

        for (let x = 0; x < canvas.width; x++) {
          const y = baseY +
            Math.sin(x * frequency + time + wave) * amplitude +
            Math.sin(x * frequency * 2.5 + time * 1.5) * amplitude * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(0, 230, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
};

export default WaveformBackground;
