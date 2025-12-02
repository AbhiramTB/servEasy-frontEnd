import React, { useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import ChatImageUploadModal from '../ChatImageUploadModal'; 

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  sendMessage: () => void;
  handleImgUpload: (img: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  onEmojiClick: (emoji: any, event: any) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  handleImgUpload,
  showEmojiPicker,
  setShowEmojiPicker,
  onEmojiClick
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker, setShowEmojiPicker]);

  return (
    <div className="p-4 border-t border-base-300 bg-base-200">
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 "  >
          <ChatImageUploadModal uploadImg={handleImgUpload} />
        </div>

        {/* <input
          ref={inputRef}
          type="text"
          className="w-full py-3 rounded-full px-14 input input-bordered focus:border-primary"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        /> */}
        <textarea
  ref={inputRef}
  className="w-full py-3 rounded-2xl px-14 input input-bordered resize-none overflow-y-auto max-h-48 min-h-[3rem] focus:border-primary"
  placeholder="Type a message..."
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline on Enter
      sendMessage();
    }
  }}
/>

        <div className="absolute flex items-center space-x-2 right-4 tooltip tooltip-left tooltip-secondary"  data-tip="Add Emoji">
          <button
            className="btn btn-circle btn-ghost btn-sm"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <Smile size={20} />
          </button>

          <button
            className={`btn btn-circle btn-sm ${
              newMessage.trim() ? 'btn-primary text-primary-content' : 'btn-ghost opacity-50'
            }`}
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {showEmojiPicker && (
        <div ref={pickerRef} className="absolute z-20 bottom-20 right-4" >
          <EmojiPicker onEmojiClick={onEmojiClick} height={350} width={320} />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
