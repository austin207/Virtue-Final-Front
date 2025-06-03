
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { fadeIn } from '@/utils/animationUtils';
import 'katex/dist/katex.min.css';

interface MessageContentProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ role, content }) => {
  if (role === 'user') {
    return <div className="transition-all duration-200 whitespace-pre-wrap">{content}</div>;
  }
  
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        pre: ({ node, ...props }) => (
          <pre className={`bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-auto text-sm ${fadeIn(1)}`} {...props} />
        ),
        code: ({ node, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          return props.inline ? (
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono transition-colors" {...props}>
              {children}
            </code>
          ) : (
            <code className={`${className} block font-mono ${fadeIn(1)}`} {...props}>
              {children}
            </code>
          );
        },
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline dark:text-blue-400 transition-colors hover:text-blue-800 dark:hover:text-blue-300" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className={`list-disc pl-6 my-4 space-y-1 ${fadeIn(2)}`} {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className={`list-decimal pl-6 my-4 space-y-1 ${fadeIn(2)}`} {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="my-1 transition-transform hover:translate-x-0.5" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className={`border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic my-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r ${fadeIn(1)}`} {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="my-3 leading-relaxed transition-opacity" {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h1 className={`text-3xl font-bold my-6 text-gray-900 dark:text-gray-100 ${fadeIn(1)}`} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className={`text-2xl font-bold my-5 text-gray-900 dark:text-gray-100 ${fadeIn(1)}`} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className={`text-xl font-bold my-4 text-gray-900 dark:text-gray-100 ${fadeIn(2)}`} {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className={`text-lg font-bold my-3 text-gray-900 dark:text-gray-100 ${fadeIn(2)}`} {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className={`my-6 border-gray-300 dark:border-gray-600 ${fadeIn(1)}`} {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className={`overflow-auto my-4 rounded-lg border border-gray-300 dark:border-gray-600 ${fadeIn(2)}`}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img className={`max-w-full h-auto rounded-lg my-4 shadow-md hover:shadow-lg transition-all ${fadeIn(2)}`} {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic text-gray-800 dark:text-gray-200" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
