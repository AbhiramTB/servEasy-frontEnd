import React, { useState } from 'react';

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Small Image */}
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer rounded-md object-cover ${className}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <dialog className="modal modal-open my-auto ">
          <div className="modal-box max-w-xl p-4">
            <button className="btn btn-sm btn-circle btn-outline absolute right-3 top-3" onClick={() => setOpen(false)}>
              ✕
            </button>

            <img src={src} alt={alt} className="w-full h-auto rounded-lg object-contain" />
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default ImagePreview;
