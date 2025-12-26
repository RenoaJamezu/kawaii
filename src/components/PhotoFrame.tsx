import { useDraggableBounds } from "@/hooks/useDraggableBounds";
import { useState } from "react";
import PhotoModal from "./PhotoModal";

export default function PhotoFrame({
  src,
  date,
  parentRef,
  onPhotoClick,
  photoId,
  zIndex
}: {
  src: string;
  date: string;
  parentRef: React.RefObject<HTMLDivElement>;
  onPhotoClick: (photoId: string) => void;
  photoId: string;
  zIndex: number;
}) {
  const [open, setOpen] = useState(false);
  const { ref, position, rotation, moved, bind } =
    useDraggableBounds(parentRef);

  return (
    <>
      <div
        ref={ref}
        {...bind}
        onClick={() => {
          onPhotoClick(photoId);
          if (!moved.current) setOpen(true);
        }}
        className="absolute w-20 md:w-40 bg-white p-1 rounded-md shadow-xl cursor-grab active:cursor-grabbing select-none transition-transform duration-200"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          zIndex: zIndex
        }}
      >
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover rounded pointer-events-none"
        />
      </div>

      {open && (
        <PhotoModal
          src={src}
          date={date}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}