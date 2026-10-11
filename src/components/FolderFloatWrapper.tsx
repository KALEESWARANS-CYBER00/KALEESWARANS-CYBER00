'use client';

import React, { Component, useState, useEffect, useRef, type ReactNode } from 'react';
import FolderFloat, { FolderFloatProps } from './FolderFloat';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class FolderFloatErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface FolderFloatWrapperProps extends FolderFloatProps {
  className?: string;
}

export default function FolderFloatWrapper({ className = '', ...props }: FolderFloatWrapperProps) {
  const [status, setStatus] = useState<'ready' | 'failed'>('ready');
  const retryRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleRuntimeError = () => {
    if (retryRef.current < 2) {
      const delay = retryRef.current === 0 ? 500 : 1000;
      retryRef.current += 1;
      setStatus('failed');
      timerRef.current = setTimeout(() => {
        setStatus('ready');
      }, delay);
    } else {
      setStatus('failed');
    }
  };

  if (status !== 'ready') {
    return null;
  }

  return (
    <FolderFloatErrorBoundary onError={handleRuntimeError}>
      <FolderFloat className={className} {...props} />
    </FolderFloatErrorBoundary>
  );
}
