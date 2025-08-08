'use client';

import { Button, Text, Flex, Heading, Box, Table, TextField } from '@radix-ui/themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const MdxComponents = {
  Button,
  Text,
  Flex,
  Heading,
  Box,
  Table,
  TextField,
  'TextField.Root': TextField.Root,
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