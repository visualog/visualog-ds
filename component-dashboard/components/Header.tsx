'use client';

import { Box, Flex, TextField, Popover, Text, IconButton } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  allComponentPaths: { category: string; slug: string; title: string }[];
}

export function Header({ searchQuery, setSearchQuery, allComponentPaths }: HeaderProps) {
  const [suggestions, setSuggestions] = useState<{
    category: string;
    slug: string;
    title: string;
  }[]>([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allComponentPaths.filter(
        (component) =>
          component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, allComponentPaths]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSuggestions([]);
    }
  };

  return (
    <Box p="4" style={{ borderBottom: '1px solid var(--gray-a5)' }}>
      <Flex align="center" justify="between">
        <Box>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Component Dashboard</h1>
        </Box>
        <Flex align="center" gap="3">
          <Box style={{ position: 'relative' }}>
            <TextField.Root
              placeholder="Search components..."
              size="2"
              style={{ width: '200px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {suggestions.length > 0 && searchQuery.length > 0 && (
              <Popover.Root open={true}>
                <Popover.Content
                  side="bottom"
                  align="start"
                  style={{
                    width: 'var(--radix-popover-trigger-width)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 9999,
                  }}
                >
                  <Flex direction="column" gap="1">
                    {suggestions.map((component) => (
                      <Link key={component.slug} href={`/${component.category}/${component.slug}`} passHref>
                        <Text as="a" size="2" style={{ textDecoration: 'none', padding: '0.5rem', display: 'block' }}>
                          {component.title} ({component.category})
                        </Text>
                      </Link>
                    ))}
                  </Flex>
                </Popover.Content>
              </Popover.Root>
            )}
          </Box>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
