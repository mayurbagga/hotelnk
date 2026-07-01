import { useState, useEffect, useRef } from 'react';

export const useCountUp = (
  end: number,
  duration: number = 1000,
  start: number = 0
): number => {
  const [count, setCount] = useState(start);
  const startTime = useRef<number | null>(null);
  const startValue = useRef(start);

  useEffect(() => {
    startTime.current = null;
    startValue.current = count;

    const animate = (currentTime: number) => {
      if (!startTime.current) {
        startTime.current = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime.current) / duration,
        1
      );

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue.current + (end - startValue.current) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};
