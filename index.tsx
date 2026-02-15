// FIX: Import 'three-init' at the very top to ensure react-three-fiber is extended before any R3F components are loaded.
import "./three-init";

import React, { ReactNode, ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// SAFEGUARD: Polyfill process for browser environments immediately to prevent crashes in third-party libraries
if (typeof window !== 'undefined' && !(window as any).process) {
    (window as any).process = { env: { NODE_ENV: 'development' } };
}

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// FIX: Error Boundary to catch render crashes and prevent white screen of death.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly declare props to satisfy TypeScript if implicit inheritance from React.Component fails
  declare props: Readonly<ErrorBoundaryProps>;

  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6 font-sans">
          <div className="max-w-xl text-center p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
             <div className="text-5xl mb-4">⚠️</div>
             <h1 className="text-3xl font-bold text-red-400 mb-4">Something went wrong</h1>
             <p className="text-gray-300 mb-6 text-lg">The application encountered a critical error during initialization.</p>
             <div className="bg-black/50 p-4 rounded-xl text-left overflow-auto max-h-60 mb-8 font-mono text-xs text-red-200 border border-red-900/50">
                {this.state.error?.message || "Unknown error occurred"}
             </div>
             <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/30"
             >
                Reload Application
             </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Get root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create root and render App
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
  </React.StrictMode>
);