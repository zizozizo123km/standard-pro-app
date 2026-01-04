import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster.tsx';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="facebook-ui-theme">
        <Router>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);