'use client';

import { Theme } from '@radix-ui/themes';
import React from 'react';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Theme accentColor="brand">
      {children}
    </Theme>
  );
}
