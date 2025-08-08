'use client';

import { compileMDX } from 'next-mdx-remote/rsc';
import { Button, Theme } from '@radix-ui/themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useEffect, useState } from 'react';
import '@radix-ui/themes/styles.css';

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  const [content, setContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const compile = async () => {
      try {
        const { content } = await compileMDX({
          source,
          components: {
            Button,
            code: ({ className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          },
          options: { parseFrontmatter: true }
        });
        setContent(content);
      } catch (error) {
        console.error('Error compiling MDX:', error);
        setContent(<div>Error compiling content</div>);
      }
    };

    compile();
  }, [source]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <Theme accentColor="blue">
      {content}
    </Theme>
  );
}
