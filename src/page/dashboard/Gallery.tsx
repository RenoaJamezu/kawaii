import { useRef, useState } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import { PHOTOS } from "@/constants/photo.index";

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({});

  const handlePhotoClick = (photoId: string) => {
    setZIndexMap((prevMap) => {
      const maxZ = Math.max(0, ...Object.values(prevMap));
      return {
        ...prevMap,
        [photoId]: maxZ + 1,
      };
    });
  };

  return (
    <div className="bg-white rounded-xl w-full h-full p-5 fade-slide-top">
      <h1 className="font-display text-primary font-bold text-xl mb-3">
        Captures
      </h1>

      <div ref={galleryRef} className="relative w-full h-4/5">
        {PHOTOS.map((photo) => (
          <PhotoFrame
            key={photo.id}
            src={photo.src}
            date={photo.date}
            parentRef={galleryRef as React.RefObject<HTMLDivElement>}
            onPhotoClick={handlePhotoClick}
            photoId={photo.id}
            zIndex={zIndexMap[photo.id] || 0}
          />
        ))}
      </div>
    </div>
  );
}