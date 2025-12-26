import { useRef, useState, useCallback, useEffect } from "react";

type Position = { x: number; y: number };

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function useDraggableBounds(
  parentRef: React.RefObject<HTMLDivElement>,
  randomOnMount = true
) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const offset = useRef<Position>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const moved = useRef(false);

  useEffect(() => {
    if (!randomOnMount || !ref.current || !parentRef.current) return;

    const img = ref.current.querySelector("img");
    if (!img) return;

    const handleImageLoad = () => {
      const parent = parentRef.current!.getBoundingClientRect();
      const rect = ref.current!.getBoundingClientRect();

      setPosition({
        x: randomBetween(0, Math.max(0, parent.width - rect.width)),
        y: randomBetween(0, Math.max(0, parent.height - rect.height))
      });

      setRotation(randomBetween(-12, 12));
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
      return () => img.removeEventListener("load", handleImageLoad);
    }
  }, [parentRef, randomOnMount]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      moved.current = false;

      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || !ref.current || !parentRef.current) return;

      moved.current = true;

      const parent = parentRef.current.getBoundingClientRect();
      const rect = ref.current.getBoundingClientRect();

      let x = e.clientX - offset.current.x;
      let y = e.clientY - offset.current.y;

      x = Math.max(0, Math.min(x, parent.width - rect.width));
      y = Math.max(0, Math.min(y, parent.height - rect.height));

      setPosition({ x, y });
    },
    [parentRef]
  );

  const onPointerUp = () => {
    dragging.current = false;
  };

  return {
    ref,
    position,
    rotation,
    moved,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp
    }
  };
}