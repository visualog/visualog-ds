'use client';

import React, { useState } from 'react';
import { Flex, Box } from '@radix-ui/themes';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutClientProps {
  children: React.ReactNode;
  componentPaths: { category: string; slug: string; title: string }[];
}

export function LayoutClient({ children, componentPaths }: LayoutClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} allComponentPaths={componentPaths} />

      <Flex flexGrow="1">
        {/* Sidebar */}
        <Flex direction="column" as="aside" style={{ width: '250px', borderRight: '1px solid var(--gray-a5)', flexShrink: 0 }}>
          <Sidebar searchQuery={searchQuery} componentPaths={componentPaths} />
        </Flex>

        {/* Main Content */}
        <Box as="main" p="4" flexGrow="1">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}