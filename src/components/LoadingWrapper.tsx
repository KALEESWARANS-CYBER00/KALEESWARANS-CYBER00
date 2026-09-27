'use client';

import { ReactNode } from 'react';
import SplashScreen from '@/components/SplashScreen';

export default function LoadingWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <SplashScreen />
      {children}
    </>
  );
}
