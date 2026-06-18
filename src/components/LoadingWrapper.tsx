'use client';
import { useState, useEffect, ReactNode } from 'react';
import SplashScreen from '@/components/SplashScreen';

interface LoadingWrapperProps {
  children: ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <SplashScreen /> : <>{children}</>;
}
