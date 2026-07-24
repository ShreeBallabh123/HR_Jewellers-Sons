import React, { useEffect, useState, useRef } from 'react';

/**
 * Custom Luxury Cursor Component
 * Provides a high-end golden ring follower, glowing center dot,
 * hover element detection, click sparkle animation, and smooth physics.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isSupported, setIsSupported] = useState(true);

  const targetRef = useRef({ x: -100, y: -100 });
  const followerRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  // Check touch / pointer capability
  useEffect(() => {
    const checkSupport = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isLargeScreen = window.innerWidth >= 768;
      setIsSupported(hasFinePointer && isLargeScreen);
    };

    checkSupport();
    window.addEventListener('resize', checkSupport);
    return () => window.removeEventListener('resize', checkSupport);
  }, []);

  // Smooth lerp physics for follower ring
  useEffect(() => {
    if (!isSupported) return;

    const animateFollower = () => {
      // Lerp formula: current + (target - current) * easeFactor
      const ease = 0.18;
      followerRef.current.x += (targetRef.current.x - followerRef.current.x) * ease;
      followerRef.current.y += (targetRef.current.y - followerRef.current.y) * ease;

      setFollowerPos({
        x: followerRef.current.x,
        y: followerRef.current.y
      });

      requestRef.current = requestAnimationFrame(animateFollower);
    };

    requestRef.current = requestAnimationFrame(animateFollower);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isSupported]);

  // Track mouse movements & hover states
  useEffect(() => {
    if (!isSupported) return;

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      if (!isVisible) setIsVisible(true);

      // Check if mouse is hovering over interactive element
      const target = e.target;
      if (target) {
        const isInteractive = !!target.closest(
          'a, button, input, select, textarea, [role="button"], .cursor-pointer, .hover-bg-brand-gold, [onclick]'
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = (e) => {
      setIsClicked(true);
      
      // Spawn 5 luxury gold sparkles on click
      const newParticles = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / 5 + (Math.random() * 0.5),
        speed: 2 + Math.random() * 3,
        size: 3 + Math.random() * 3
      }));

      setParticles((prev) => [...prev.slice(-15), ...newParticles]);
    };

    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isSupported, isVisible]);

  // Particle clean-up effect
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  // Hide on mobile or touch devices
  if (!isSupported || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* 1. Outer Luxury Follower Ring */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-solid transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 border-[#E6C687] bg-[#4A126D]/15 backdrop-blur-[2px] shadow-[0_0_20px_rgba(230,198,135,0.4)] scale-110'
            : isClicked
            ? 'w-7 h-7 border-[#DDA0DD] bg-[#DDA0DD]/20 shadow-[0_0_15px_rgba(221,160,221,0.5)] scale-90'
            : 'w-9 h-9 border-[#DDA0DD]/70 bg-transparent shadow-[0_0_10px_rgba(221,160,221,0.2)]'
        }`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) translate(-50%, -50%)`
        }}
      >
        {/* Subtle spinning diamond star on hover */}
        {isHovered && (
          <div className="w-2.5 h-2.5 bg-[#E6C687] rotate-45 animate-[spin_4s_linear_infinite] shadow-[0_0_8px_#E6C687]" />
        )}
      </div>

      {/* 2. Main Cursor Core Point */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out ${
          isHovered
            ? 'w-2 h-2 bg-[#E6C687] shadow-[0_0_12px_#E6C687] scale-75'
            : isClicked
            ? 'w-3.5 h-3.5 bg-[#BA55D3] shadow-[0_0_16px_#BA55D3] scale-125'
            : 'w-2.5 h-2.5 bg-gradient-to-tr from-[#D4AF37] via-[#E6C687] to-[#DDA0DD] shadow-[0_0_10px_rgba(212,175,55,0.8)]'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
        }}
      />

      {/* 3. Click Sparkle Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="fixed rounded-full bg-gradient-to-r from-[#E6C687] to-[#DDA0DD] animate-ping"
          style={{
            left: `${p.x + Math.cos(p.angle) * 18}px`,
            top: `${p.y + Math.sin(p.angle) * 18}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 10px #E6C687',
            animationDuration: '0.4s'
          }}
        />
      ))}
    </div>
  );
}
