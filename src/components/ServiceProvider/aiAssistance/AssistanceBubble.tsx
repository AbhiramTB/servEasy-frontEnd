import { Message } from '../../../utils/types/IAiassistance';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

export default function AssistanceBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2` }>
      <div
        className={`max-w-full sm:max-w-xl lg:max-w-2xl break-words whitespace-pre-wrap px-4 py-2 rounded-2xl ${
          isUser ? 'bg-primary/75 text-primary-content' : 'bg-base-300 text-base-content'
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <div className="prose-sm prose max-w-none ">
            <Markdown  remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {message.content}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
