import { useEffect, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1, rootMargin = '-50px') => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold, 
        rootMargin
      }
    );

    if (elementRef) {
      observer?.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer?.unobserve(elementRef);
      }
    };
  }, [elementRef, threshold, rootMargin]);

  return [setElementRef, isVisible];
};

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e?.clientX !== undefined && e?.clientY !== undefined) {
        setMousePosition({ x: e?.clientX, y: e?.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};