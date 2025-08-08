'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { Button, Text, Flex, Heading, Box, Table } from '@radix-ui/themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export function MdxContent({ source }: { source: string }) {
  const components = {
    Button,
    Text,
    Flex,
    Heading,
    Box,
    Table,
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
  };

  return (
    <MDXRemote source={source} components={components} />
  );
}
