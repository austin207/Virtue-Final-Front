
import React from 'react';
import ReactMarkdown from 'react-markdown';
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
        pre: ({ node, ...props }) => (
          <pre className="bg-gray-800 text-gray-100 rounded-md p-4 my-4 overflow-auto animate-fade-in" {...props} />
        ),
        code: ({ node, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          return props.inline ? (
            <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          ) : (
            <code className={`${className} block animate-fade-in`} {...props}>
              {children}
            </code>
          );
        },
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline dark:text-blue-400 transition-colors" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 my-4 animate-fade-in" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 my-4 animate-fade-in" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="my-1" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 py-2 animate-fade-in" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-2" {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold my-4 animate-fade-in" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-bold my-3 animate-fade-in" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-bold my-3 animate-fade-in" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-base font-bold my-2 animate-fade-in" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-4 border-gray-200 dark:border-gray-700 animate-fade-in" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-auto my-4 animate-fade-in">
            <table className="min-w-full border border-gray-300 dark:border-gray-700" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="py-2 px-3 text-left text-sm font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="py-2 px-3 text-sm" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img className="max-w-full h-auto rounded-md my-4 animate-fade-in" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
