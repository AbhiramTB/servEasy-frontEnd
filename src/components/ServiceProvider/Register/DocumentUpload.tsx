import React, { useRef } from "react";

interface DocumentUploadProps {
  label: string;
  documentImg: string | null;
  setDocumentImg: (img: string | null) => void;
  documentError: string | null;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  documentImg,
  setDocumentImg,
  documentError,
  
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentImg(reader.result as string); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    imageRef.current?.click();
  };

  return (
    <div className="w-full mb-4 form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>

      {!documentImg ? (
        <div
          className="p-6 text-center transition border-2 border-dashed rounded-lg cursor-pointer bg-base-100 hover:bg-base-200"
          onClick={handleUploadClick}
        >
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <input
              type="file"
              ref={imageRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
            <p className="mt-2 text-sm">
              Drag and drop or{" "}
              <span className="font-medium text-primary">browse files</span>
            </p>
            <p className="text-xs opacity-70">PNG, JPG or PDF up to 5MB</p>
          </div>
        </div>
      ) : (
        <div className="w-2/3 mx-auto mt-4">
          <img src={documentImg} alt="Preview" className="rounded shadow" />
          <button
            type="button"
            className="mt-2 btn btn-sm btn-error"
            onClick={() => setDocumentImg(null)}
          >
            Remove Document
          </button>
        </div>
      )}

      {documentError && (
        <p className="mt-1 text-sm text-error">{documentError}</p>
      )}
    </div>
  );
};

export default DocumentUpload;
