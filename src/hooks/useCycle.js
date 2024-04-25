import { useEffect, useRef } from 'react';

export default function useCycle(
  onCycle = () => {},
  intervalSecs = 1
) {
  const onCycleRef = useRef();
  const animRef = useRef();
  const initTimeRef = useRef(performance?.now());
  const prevCycleTimeRef = useRef(performance?.now());

  onCycleRef.current = onCycle;

  const onFrame = (time) => {
    const elapsedSinceLastCycle = (time - prevCycleTimeRef.current) / 1000;
    const elapsedTotal = (time - initTimeRef.current) / 1000;

    const cycles = Math.floor(
      elapsedSinceLastCycle / intervalSecs
    );

    if (cycles >= 1) {
      onCycleRef.current({
        cycles,
        elapsedTotal
      });

      prevCycleTimeRef.current = time;
    }

    animRef.current = requestAnimationFrame(onFrame);
  };

  useEffect(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef?.current);
    }
    animRef.current = requestAnimationFrame(onFrame);
    return () => (
      cancelAnimationFrame(animRef?.current)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    intervalSecs
  ]);
}