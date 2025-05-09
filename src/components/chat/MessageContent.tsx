
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fadeIn } from '@/utils/animationUtils';

interface MessageContentProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ role, content }) => {
  if (role === 'user') {
    return <div className="transition-all duration-200">{content}</div>;
  }
  
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ node, ...props }) => (
          <pre className={`bg-gray-800 text-gray-100 rounded-md p-4 my-4 overflow-auto ${fadeIn(1)}`} {...props} />
        ),
        code: ({ node, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          return props.inline ? (
            <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm transition-colors" {...props}>
              {children}
            </code>
          ) : (
            <code className={`${className} block ${fadeIn(1)}`} {...props}>
              {children}
            </code>
          );
        },
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline dark:text-blue-400 transition-colors hover:text-blue-800 dark:hover:text-blue-300" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className={`list-disc pl-6 my-4 ${fadeIn(2)}`} {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className={`list-decimal pl-6 my-4 ${fadeIn(2)}`} {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="my-1 transition-transform hover:translate-x-0.5" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className={`border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 py-2 ${fadeIn(1)}`} {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-2 transition-opacity" {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h1 className={`text-2xl font-bold my-4 ${fadeIn(1)}`} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className={`text-xl font-bold my-3 ${fadeIn(1)}`} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className={`text-lg font-bold my-3 ${fadeIn(2)}`} {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className={`text-base font-bold my-2 ${fadeIn(2)}`} {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className={`my-4 border-gray-200 dark:border-gray-700 ${fadeIn(1)}`} {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className={`overflow-auto my-4 ${fadeIn(2)}`}>
            <table className="min-w-full border border-gray-300 dark:border-gray-700 transition-all" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-100 dark:bg-gray-800 transition-colors" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-150" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="py-2 px-3 text-left text-sm font-semibold transition-colors" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="py-2 px-3 text-sm transition-colors" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img className={`max-w-full h-auto rounded-md my-4 hover:shadow-md transition-all ${fadeIn(2)}`} {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
