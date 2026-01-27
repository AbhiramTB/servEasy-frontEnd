import { Paperclip, Image as ImageIcon, X } from "lucide-react";
import React, { useState } from "react";

interface IFileUploadProp {
  uploadImg?: (img: string) => void;
}

const ChatImageUploadModal: React.FC<IFileUploadProp> = ({ uploadImg }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewImg(base64String); 
    };

    reader.readAsDataURL(selectedFile); 
  }
};


  const handleSend = () => {
    if (file && uploadImg) {
      uploadImg(previewImg || "");
    }
    setPreviewImg(null);
    setFile(null);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        className="btn btn-circle btn-ghost btn-sm "
        onClick={() => setShowOptions(!showOptions)}
      >
        <Paperclip size={18} />
      </button>

      {showOptions && (
        <div className="absolute left-0 z-10 w-48 p-2 rounded-md shadow-md bottom-10 bg-base-100">
          <label
            htmlFor="chat-img-upload"
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-base-200"
          >
            <ImageIcon size={16} />
            <span>Send Image</span>
          </label>
          <input
            id="chat-img-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      )}

      {previewImg && (
        <div className="absolute left-0 z-20 w-64 p-3 rounded-md shadow-lg bottom-16 bg-base-100">
          <div className="relative">
            <img src={previewImg} alt="Preview" className="object-cover w-full h-auto mb-2 rounded-md" />
            <button
              onClick={() => {
                setPreviewImg(null);
                setFile(null);
              }}
              className="absolute top-0 right-0 p-1 text-error"
            >
              <X size={18} />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="w-full mt-2 btn btn-sm btn-primary"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatImageUploadModal;
