import React, { useState } from 'react';
import dayjs from 'dayjs';
import MessageStatus from './MessageStatus.tsx';
import { IMessage } from '../../../utils/types/IChat';
import InitialAvatar from '../../../utils/ui/InitialAvatar.tsx';

interface ChatMessageProps {
  msg: IMessage;
  currentRole: 'user' | 'serviceProvider';
  participantAvatar?: string;
  participantName?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ msg, currentRole, participantAvatar, participantName }) => {
  const isCurrentUser = msg.sender === currentRole;
  const showAvatar = msg.sender !== currentRole;
  const bubbleAlignClass = isCurrentUser ? 'chat-end' : 'chat-start';
  const bubbleStyleClass = isCurrentUser ? 'chat-bubble-primary text-primary-content' : 'bg-base-200 text-base-content';

  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleImageClick = () => {
    setPreviewImg(msg.content);
  };
  const handleDownload = () => {
    const cloudinaryUrl = msg.content.replace('/upload/', '/upload/fl_attachment/');

    const link = document.createElement('a');
    link.href = cloudinaryUrl;
    link.download = `image_${msg.id || Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => setPreviewImg(null);

  return (
    <>
      <div className={`chat ${bubbleAlignClass} `}>
        {showAvatar && (
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <InitialAvatar
                name={participantName || 'User'}
                imageSrc={participantAvatar}
                bgColor="bg-accent"
                textColor="text-accent-content"
              />
            </div>
          </div>
        )}

        {msg.messageType === 'text' && <div className={`chat-bubble ${bubbleStyleClass} shadow-sm`}>{msg.content}</div>}

        {msg.messageType === 'image' && (
          <div className={`chat-bubble w-1/2 ${bubbleStyleClass} shadow-sm cursor-pointer`} onClick={handleImageClick}>
            <img src={msg.content} alt={msg.id} className="object-cover w-full h-auto rounded-md" />
          </div>
        )}

        <div className="flex items-center gap-1 text-xs chat-footer opacity-70">
          <div className="tooltip tooltip-bottom" data-tip={dayjs(msg.timestamp).format('DD-MM-YYYY')}>
            {dayjs(msg.timestamp).format('hh:mm A')}
          </div>

          {isCurrentUser && msg.status && (
            <span className="ml-1">
              <MessageStatus status={msg.status} />
            </span>
          )}
        </div>
      </div>

      {previewImg && (
        <dialog id="img_modal" className="modal modal-open" onClick={handleClose}>
          <div className="max-w-3xl p-0 modal-box bg-base-100" onClick={e => e.stopPropagation()}>
            <img src={previewImg} alt="Preview" className="w-full rounded-t-md" />
            <div className="justify-between p-4 modal-action">
              <button onClick={handleDownload} className="btn btn-outline btn-sm">
                Download
              </button>
              <button className="btn btn-sm" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ChatMessage;
