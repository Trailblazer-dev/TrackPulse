import React, { createContext, useContext, useState } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiContextType {
  status: Record<string, ApiStatus>;
  error: Record<string, any>;
  setLoading: (key: string) => void;
  setSuccess: (key: string) => void;
  setError: (key: string, error: any) => void;
  reset: (key: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<Record<string, ApiStatus>>({});
  const [error, setErrorState] = useState<Record<string, any>>({});

  const setLoading = (key: string) => {
    setStatus(prev => ({ ...prev, [key]: 'loading' }));
    setErrorState(prev => ({ ...prev, [key]: null }));
  };

  const setSuccess = (key: string) => {
    setStatus(prev => ({ ...prev, [key]: 'success' }));
  };

  const setError = (key: string, error: any) => {
    setStatus(prev => ({ ...prev, [key]: 'error' }));
    setErrorState(prev => ({ ...prev, [key]: error }));
  };

  const reset = (key: string) => {
    setStatus(prev => ({ ...prev, [key]: 'idle' }));
    setErrorState(prev => ({ ...prev, [key]: null }));
  };

  return (
    <ApiContext.Provider value={{ status, error, setLoading, setSuccess, setError, reset }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
