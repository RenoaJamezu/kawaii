type PhotoModalProps = {
  src: string;
  date: string;
  onClose: () => void;
};

export default function PhotoModal({ src, date, onClose }: PhotoModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh] shadow-2xl animate-in zoom-in duration-300"
      >
        <img
          src={src}
          alt="Preview"
          className="max-w-full max-h-[80vh] rounded object-contain"
        />
        <h2 className="font-mono text-primary mt-2 text-end opacity-80">{date}</h2>
      </div>
    </div>
  );
}
