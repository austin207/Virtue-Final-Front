
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageContentProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ role, content }) => {
  if (role === 'user') {
    return <div>{content}</div>;
  }
  
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        pre: (props) => (
          <pre className="bg-gray-800 text-gray-100 rounded-md p-4 my-4 overflow-auto" {...props} />
        ),
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !className ? (
            <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        a: (props) => (
          <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />
        ),
        ul: (props) => (
          <ul className="list-disc pl-6 my-4" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal pl-6 my-4" {...props} />
        ),
        li: (props) => (
          <li className="my-1" {...props} />
        ),
        blockquote: (props) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4" {...props} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
