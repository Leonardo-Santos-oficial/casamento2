import { useState } from 'react';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface UseLoadingStateReturn {
  state: LoadingState;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  startLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
  reset: () => void;
}

export const useLoadingState = (initialState: LoadingState = 'idle'): UseLoadingStateReturn => {
  const [state, setState] = useState<LoadingState>(initialState);

  return {
    state,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    startLoading: () => setState('loading'),
    setSuccess: () => setState('success'),
    setError: () => setState('error'),
    reset: () => setState('idle')
  };
};
