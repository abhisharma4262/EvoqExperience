"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Ray = {
  /** bottom-edge start x as 0..1 of width */
  x0: number;
  weight: number;
  speed: number;
  color: [number, number, number];
  bits: { t: number; digit: string; glow: number }[];
};

/**
 * The Shift: horizon speed field.
 * A ground-plane perspective into a soft horizon (not a tunnel pinching
 * to one bright vanishing-point dot). Dashes + binary race toward the
 * horizon and accelerate.
 */
export function ShiftAccelerationGlass() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let active = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rays: Ray[] = [];
    let cycleStart = performance.now();
    let last = performance.now();

    const palette: [number, number, number][] = [
      [9, 167, 141],
      [82, 224, 129],
      [148, 222, 165],
      [51, 112, 119],
      [40, 92, 98],
    ];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /** Map path param t (0 near camera → 1 at horizon) to screen */
    const alongRay = (
      ray: Ray,
      t: number,
      horizonY: number,
      vpX: number,
    ) => {
      // Ease so travel near horizon compresses (atmospheric perspective)
      const e = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 1.65);
      const bottomY = height * 0.98;
      const startX = ray.x0 * width;
      const x = lerp(startX, vpX, e);
      const y = lerp(bottomY, horizonY, e);
      // Scale shrinks toward horizon but never to a hard point
      const scale = Math.max(0.18, 1 - e * 0.78);
      return { x, y, scale, e };
    };

    const rebuild = () => {
      // Spread starts across the lower field, more on the right of copy
      const n = 11;
      rays = Array.from({ length: n }, (_, i) => {
        const u = i / (n - 1);
        const x0 = 0.08 + u * 1.05;
        const bitCount = 8 + (i % 4);
        return {
          x0,
          weight: 1.3 + (i % 3) * 0.7,
          speed: 0.65 + (i % 5) * 0.2,
          color: palette[i % palette.length]!,
          bits: Array.from({ length: bitCount }, (_, b) => ({
            t: (b / bitCount + Math.random() * 0.06) % 1,
            digit: Math.random() > 0.5 ? "1" : "0",
            glow: 0.5 + Math.random() * 0.5,
          })),
        };
      });
    };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
    };

    const speedNormAt = (t: number) => {
      if (t < 0.1) return 0.14 + t * 1.6;
      if (t < 0.8) {
        const u = (t - 0.1) / 0.7;
        return 0.3 + u * u * (3 - 2 * u) * 0.7;
      }
      if (t < 0.92) return 1;
      return Math.max(0.12, 1 - (t - 0.92) / 0.08);
    };

    const drawSkyAndHorizon = (
      horizonY: number,
      vpX: number,
      speedNorm: number,
    ) => {
      // Soft sky wash above horizon
      const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, "rgba(246,243,240,0)");
      sky.addColorStop(0.55, "rgba(228,242,238,0.35)");
      sky.addColorStop(1, "rgba(9,167,141,0.1)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, horizonY);

      // Ground plane wash below horizon
      const ground = ctx.createLinearGradient(0, horizonY, 0, height);
      ground.addColorStop(0, `rgba(12,34,38,${0.1 + speedNorm * 0.06})`);
      ground.addColorStop(0.35, "rgba(9,167,141,0.07)");
      ground.addColorStop(1, "rgba(246,243,240,0)");
      ctx.fillStyle = ground;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Real horizon: a wide luminous band, not a pinpoint
      const bandH = Math.max(18, height * 0.045);
      const band = ctx.createLinearGradient(
        0,
        horizonY - bandH,
        0,
        horizonY + bandH,
      );
      band.addColorStop(0, "rgba(255,255,255,0)");
      band.addColorStop(
        0.45,
        `rgba(229,253,132,${0.18 + speedNorm * 0.12})`,
      );
      band.addColorStop(0.5, `rgba(255,255,255,${0.45 + speedNorm * 0.2})`);
      band.addColorStop(
        0.55,
        `rgba(82,224,129,${0.22 + speedNorm * 0.12})`,
      );
      band.addColorStop(1, "rgba(9,167,141,0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, horizonY - bandH, width, bandH * 2);

      // Soft glow centered near vp but spread wide along horizon
      const haze = ctx.createRadialGradient(
        vpX,
        horizonY,
        width * 0.04,
        vpX,
        horizonY,
        width * 0.42,
      );
      haze.addColorStop(0, `rgba(255,255,255,${0.28 + speedNorm * 0.15})`);
      haze.addColorStop(0.25, `rgba(148,222,165,${0.16 + speedNorm * 0.08})`);
      haze.addColorStop(0.55, `rgba(9,167,141,${0.08 + speedNorm * 0.05})`);
      haze.addColorStop(1, "rgba(9,167,141,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, horizonY - bandH * 3, width, bandH * 6);

      // Thin horizon rule
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${0.35 + speedNorm * 0.15})`;
      ctx.lineWidth = 1;
      ctx.moveTo(width * 0.22, horizonY);
      ctx.lineTo(width * 0.98, horizonY);
      ctx.stroke();
    };

    /** Contour lines parallel to horizon: sell the ground plane */
    const drawContours = (
      horizonY: number,
      vpX: number,
      speedNorm: number,
    ) => {
      const count = 7;
      for (let i = 1; i <= count; i++) {
        const t = i / (count + 1);
        // denser near horizon
        const e = 1 - Math.pow(1 - t, 1.8);
        const y = lerp(height * 0.98, horizonY, e);
        const halfSpan = lerp(width * 0.7, width * 0.08, e);
        const cx = lerp(width * 0.55, vpX, e);
        const a = (0.06 + speedNorm * 0.05) * (1 - e * 0.4);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(51,112,119,${a})`;
        ctx.lineWidth = Math.max(0.6, 1.4 * (1 - e));
        ctx.moveTo(cx - halfSpan, y);
        ctx.lineTo(cx + halfSpan, y);
        ctx.stroke();
      }
    };

    const drawRayGuide = (
      ray: Ray,
      horizonY: number,
      vpX: number,
      speedNorm: number,
    ) => {
      const [r, g, b] = ray.color;
      ctx.beginPath();
      const steps = 32;
      for (let i = 0; i <= steps; i++) {
        // Stop short of horizon so lines dissolve into the band, not a tip
        const t = (i / steps) * 0.92;
        const p = alongRay(ray, t, horizonY, vpX);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},${0.1 + speedNorm * 0.1})`;
      ctx.lineWidth = ray.weight * 0.75;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawBit = (
      ray: Ray,
      bit: { t: number; digit: string; glow: number },
      horizonY: number,
      vpX: number,
      speedNorm: number,
    ) => {
      if (bit.t < 0 || bit.t > 0.94) return;
      const head = alongRay(ray, bit.t, horizonY, vpX);
      const trailLen = 0.04 + speedNorm * 0.1;
      const tail = alongRay(ray, Math.max(0, bit.t - trailLen), horizonY, vpX);
      const [r, g, b] = ray.color;
      const fade = 1 - head.e * 0.75;
      const a = (0.35 + speedNorm * 0.55) * bit.glow * fade;
      const lw = ray.weight * head.scale * (1.6 + speedNorm * 2.8);

      const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${a * 0.45})`);
      grad.addColorStop(1, `rgba(255,255,255,${Math.min(0.95, a + 0.15)})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = lw;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(head.x, head.y);
      ctx.stroke();

      if (head.scale > 0.28 && bit.t < 0.85) {
        const size = Math.max(8, 16 * head.scale * (0.85 + speedNorm * 0.3));
        ctx.save();
        ctx.font = `700 ${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = `rgba(${r},${g},${b},0.85)`;
        ctx.shadowBlur = 8 + speedNorm * 10;
        ctx.fillStyle = `rgba(12,34,38,${0.35 + a * 0.4})`;
        // Prefer dark digits on light ground near camera; lighter near horizon haze
        if (head.e > 0.55) {
          ctx.fillStyle = `rgba(246,243,240,${0.5 + a * 0.4})`;
        }
        ctx.fillText(bit.digit, head.x, head.y);
        ctx.restore();
      }
    };

    const draw = (now: number) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      if (!active) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const cycleT = ((now - cycleStart) % 7200) / 7200;
      const speedNorm = speedNormAt(cycleT);
      const flow = (0.1 + speedNorm * 0.95) * dt;

      const horizonY = height * 0.5;
      // Vanishing focus sits on the horizon, to the right of the copy
      const vpX = width * 0.78;

      ctx.clearRect(0, 0, width, height);
      drawSkyAndHorizon(horizonY, vpX, speedNorm);
      drawContours(horizonY, vpX, speedNorm);

      for (const ray of rays) {
        drawRayGuide(ray, horizonY, vpX, speedNorm);
        for (const bit of ray.bits) {
          bit.t += flow * ray.speed;
          if (bit.t > 0.96) {
            bit.t = -Math.random() * 0.08;
            bit.digit = Math.random() > 0.5 ? "1" : "0";
            bit.glow = 0.5 + Math.random() * 0.5;
          }
          drawBit(ray, bit, horizonY, vpX, speedNorm);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      const horizonY = height * 0.5;
      const vpX = width * 0.78;
      drawSkyAndHorizon(horizonY, vpX, 0.4);
      drawContours(horizonY, vpX, 0.4);
      for (const ray of rays) {
        drawRayGuide(ray, horizonY, vpX, 0.4);
        for (const bit of ray.bits.slice(0, 4)) {
          drawBit(ray, bit, horizonY, vpX, 0.4);
        }
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = Boolean(entry?.isIntersecting);
        if (active) last = performance.now();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(root);
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();
    cycleStart = performance.now();
    last = cycleStart;

    if (reduced) drawStatic();
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="shift-accel" aria-hidden>
      <div className="shift-accel__atmosphere" />
      <canvas ref={canvasRef} className="shift-accel__canvas" />
    </div>
  );
}
