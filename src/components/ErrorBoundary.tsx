'use client';

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full bg-gradient-to-br from-[#06080d] via-[#0a0f1f] to-[#06080d] flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-yellow-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 4v2M8 7h8a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              <h3 className="text-white text-lg font-bold mb-2">3D Scene Unavailable</h3>
              <p className="text-slate-400 text-sm max-w-sm">
                Your browser may not support WebGL or 3D graphics. The page is still functional.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
