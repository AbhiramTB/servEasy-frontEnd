import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date | string;
}

interface Props {
  message: Message;
}

export default function AssistanceBubble({ message }: Props) {
  const isUser = message.role === 'user';

  const formatTime = (date: Date | string) => {
    const d = dayjs(date);
    const now = dayjs();
    const diffHours = now.diff(d, 'hour');

    if (diffHours < 24) {
      return d.fromNow();
    }

    return d.format('MMM D, h:mm A');
  };

  return (
    <div className={`flex gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 sm:px-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`
        flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
        ${isUser ? 'bg-primary text-primary-content' : 'bg-secondary text-secondary-content'}
      `}
      >
        {isUser ? <User size={16} className="sm:w-5 sm:h-5" /> : <Bot size={16} className="sm:w-5 sm:h-5" />}
      </div>

      <div className={`flex-1 max-w-[85%] sm:max-w-2xl md:max-w-3xl ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`text-[10px] sm:text-xs font-semibold mb-1 ${isUser ? 'text-right' : 'text-left'} opacity-60`}>
          {isUser ? 'You' : 'Assistant'}
        </div>

        <div
          className={`
          group relative px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm
          ${isUser ? 'bg-primary text-primary-content rounded-tr-sm' : 'bg-base-200 text-base-content rounded-tl-sm'}
        `}
        >
          <div className="prose prose-xs sm:prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className={`px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-mono ${isUser ? 'bg-primary-focus/40' : 'bg-base-300'}`}
                      {...props}
                    />
                  ) : (
                    <code
                      className={`block p-2 sm:p-3 rounded-lg text-[11px] sm:text-xs overflow-x-auto font-mono ${isUser ? 'bg-primary-focus/40' : 'bg-base-300'}`}
                      {...props}
                    />
                  ),
                pre: ({ node, ...props }) => <pre className="my-2 overflow-x-auto" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    className={`underline hover:no-underline ${isUser ? 'text-primary-content opacity-90' : 'text-primary'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                h1: ({ node, ...props }) => <h1 className="text-lg sm:text-xl font-bold mt-4 mb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-base sm:text-lg font-bold mt-3 mb-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-sm sm:text-base font-semibold mt-2 mb-1" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className={`border-l-4 pl-3 my-2 italic ${isUser ? 'border-primary-content/40' : 'border-base-300'}`}
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Timestamp */}
        <div
          className={`
          text-[9px] sm:text-[10px] mt-1 opacity-40
          ${isUser ? 'text-right' : 'text-left'}
        `}
        >
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}
