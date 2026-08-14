"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class CyberErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CYBER_ERROR_BOUNDARY] Diagnostic Intercept:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[300px] bg-[#05070a] border border-[#00ff87]/30 rounded-xl p-6 flex flex-col justify-center items-center text-center backdrop-blur-md relative overflow-hidden">
          {/* Subtle Cyber Grid Layer */}
          <div className="absolute inset-0 bg-[radial-gradient(#00ff87_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

          <div className="w-12 h-12 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/40 flex items-center justify-center mb-4 text-[#00ff87]">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="text-lg font-bold text-white tracking-wide uppercase mb-1">
            {this.props.fallbackTitle || 'SYSTEM DIAGNOSTIC INTERCEPT'}
          </h3>

          <p className="text-xs text-[#00e5ff] font-mono mb-4">
            ERR_CODE: {this.state.error?.name || 'RUNTIME_FAULT'} // NODE_PROTECTED
          </p>

          <p className="text-xs text-gray-400 max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || 'An unexpected runtime anomaly occurred. System containment enabled.'}
          </p>

          <button
            onClick={this.handleReset}
            className="px-5 py-2.5 rounded-lg bg-[#00ff87]/10 border border-[#00ff87] text-[#00ff87] hover:bg-[#00ff87] hover:text-[#05070a] transition-all duration-200 text-xs font-mono font-semibold flex items-center space-x-2 tracking-wider"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESTART NODE DIAGNOSTIC</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
