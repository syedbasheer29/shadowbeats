import React, { useEffect, useRef } from 'react';

const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }
    
    const particles: Particle[] = [];
    const colors = ['#00AAFF', '#9D4EDD', '#FF3864'];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(8, 8, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.pulse += p.pulseSpeed;
        p.size = p.size * (1 + Math.sin(p.pulse) * 0.1);
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        
        connectParticles(p, particles, ctx);
      }
      
      requestAnimationFrame(animate);
    };
    
    const connectParticles = (p1: Particle, particles: Particle[], ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        const p2 = particles[i];
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );
        
        if (distance < 100) {
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = p1.alpha * (1 - distance / 100);
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.shadowColor = p1.color;
          ctx.shadowBlur = 5;
          ctx.stroke();
          ctx.restore();
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      />
      <div className="fixed inset-0 bg-cyber-grid bg-auto-40 opacity-20 animate-cyber-grid pointer-events-none -z-9" />
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none -z-8" />
    </>
  );
};

export default BackgroundEffects;