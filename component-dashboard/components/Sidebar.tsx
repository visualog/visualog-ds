'use client';

import { Box, Text, Flex, ScrollArea } from '@radix-ui/themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SidebarProps {
  searchQuery: string;
  componentPaths: { category: string; slug: string; title: string }[];
}

export function Sidebar({ searchQuery, componentPaths }: SidebarProps) {
  console.log("Sidebar - searchQuery:", searchQuery);
  console.log("Sidebar - componentPaths:", componentPaths);

  // 검색어에 따라 컴포넌트를 필터링합니다.
  const filteredComponentPaths = searchQuery
    ? componentPaths.filter(
        (component) =>
          component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : componentPaths;

  console.log("Sidebar - filteredComponentPaths:", filteredComponentPaths);

  // 카테고리별로 컴포넌트를 그룹화합니다.
  const groupedComponents: { [key: string]: { slug: string; title: string }[] } = {};
  filteredComponentPaths.forEach(({ category, slug, title }) => {
    if (!groupedComponents[category]) {
      groupedComponents[category] = [];
    }
    groupedComponents[category].push({ slug, title });
  });

  return (
    <ScrollArea type="auto" scrollbars="vertical" style={{ height: '100%' }}>
      <Box p="4" flexGrow="1">
        <Text size="5" weight="bold" mb="4" as="h2">Categories</Text>
        <nav>
          <Flex direction="column" gap="3">
            {Object.keys(groupedComponents).map((category) => (
              <Box key={category}>
                <Text size="3" weight="bold" style={{ textTransform: 'capitalize' }} mb="2" as="h3">{category}</Text>
                <Flex direction="column" gap="2" pl="3">
                  {groupedComponents[category].map((component) => (
                    <Link key={component.slug} href={`/${category}/${component.slug}`} passHref>
                      <Text size="2" color="gray" as="a" style={{ textDecoration: 'none' }}>{component.title}</Text>
                    </Link>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        </nav>
      </Box>
    </ScrollArea>
  );
}