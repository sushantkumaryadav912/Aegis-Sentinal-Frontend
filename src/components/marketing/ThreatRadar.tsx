'use client';

import React, { useEffect, useRef } from 'react';

export function ThreatRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle class
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      hue: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.3 + 0.15;
        this.alpha = this.baseAlpha;
        this.hue = Math.random() > 0.8 ? 280 : 180; // Violet or Cyan
      }

      update(radarAngle: number, centerX: number, centerY: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Calculate angle to center
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        if (angle < 0) angle += Math.PI * 2;

        // Calculate radar sweep interaction
        let angleDiff = Math.abs(angle - radarAngle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;

        if (angleDiff < 0.25 && dist < Math.min(width, height) * 0.45) {
          // Glow up when radar sweeps over
          this.alpha = 0.85;
        } else {
          // Fade back to baseline
          this.alpha += (this.baseAlpha - this.alpha) * 0.03;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
        c.fill();
        
        // Add minor drop-shadow/glow for swept particles
        if (this.alpha > 0.5) {
          c.beginPath();
          c.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          c.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.alpha * 0.25})`;
          c.fill();
        }
      }
    }

    const nodesCount = Math.floor((width * height) / 9000);
    const nodes: Node[] = [];
    for (let i = 0; i < nodesCount; i++) {
      nodes.push(new Node());
    }

    let radarAngle = 0;
    const radarSpeed = 0.008;

    const drawGrid = (c: CanvasRenderingContext2D, cx: number, cy: number, maxRadius: number) => {
      // Draw radar circle grids
      c.strokeStyle = 'rgba(0, 229, 255, 0.035)';
      c.lineWidth = 1;
      
      for (let r = maxRadius * 0.2; r <= maxRadius; r += maxRadius * 0.2) {
        c.beginPath();
        c.arc(cx, cy, r, 0, Math.PI * 2);
        c.stroke();
      }

      // Draw crosshairs
      c.beginPath();
      c.moveTo(cx - maxRadius, cy);
      c.lineTo(cx + maxRadius, cy);
      c.moveTo(cx, cy - maxRadius);
      c.lineTo(cx, cy + maxRadius);
      c.stroke();
    };

    const drawRadarSweep = (c: CanvasRenderingContext2D, cx: number, cy: number, maxRadius: number) => {
      const gradient = c.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      gradient.addColorStop(0, 'rgba(0, 229, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');

      // Draw sweep arc
      c.save();
      c.beginPath();
      c.moveTo(cx, cy);
      c.arc(cx, cy, maxRadius, radarAngle - 0.25, radarAngle, false);
      c.closePath();
      c.fillStyle = gradient;
      c.fill();
      c.restore();

      // Sweep line
      c.beginPath();
      c.moveTo(cx, cy);
      c.lineTo(cx + Math.cos(radarAngle) * maxRadius, cy + Math.sin(radarAngle) * maxRadius);
      c.strokeStyle = 'rgba(0, 229, 255, 0.25)';
      c.lineWidth = 1.5;
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.45;

      radarAngle += radarSpeed;
      if (radarAngle > Math.PI * 2) radarAngle = 0;

      // Draw radar background
      drawGrid(ctx, cx, cy, maxRadius);
      drawRadarSweep(ctx, cx, cy, maxRadius);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const combinedAlpha = Math.min(nodes[i].alpha, nodes[j].alpha) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${combinedAlpha})`;
            ctx.stroke();
          }
        }
      }

      // Update & Draw nodes
      nodes.forEach((node) => {
        node.update(radarAngle, cx, cy);
        node.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
    />
  );
}
