import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoadingState } from '../hooks/use-loading-state';

describe('useLoadingState', () => {
  it('deve iniciar com estado idle', () => {
    const { result } = renderHook(() => useLoadingState());

    expect(result.current.state).toBe('idle');
    expect(result.current.isLoading).toBe(false);
  });

  it('deve mudar para loading quando startLoading é chamado', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.startLoading();
    });

    expect(result.current.state).toBe('loading');
    expect(result.current.isLoading).toBe(true);
  });

  it('deve mudar para success quando setSuccess é chamado', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.setSuccess();
    });

    expect(result.current.state).toBe('success');
    expect(result.current.isLoading).toBe(false);
  });

  it('deve mudar para error quando setError é chamado', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.setError();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.isLoading).toBe(false);
  });

  it('deve resetar para idle quando reset é chamado', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.setSuccess();
    });

    expect(result.current.state).toBe('success');

    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toBe('idle');
  });

  it('deve manter isLoading apenas quando state for loading', () => {
    const { result } = renderHook(() => useLoadingState());

    // Idle
    expect(result.current.isLoading).toBe(false);

    // Loading
    act(() => {
      result.current.startLoading();
    });
    expect(result.current.isLoading).toBe(true);

    // Success
    act(() => {
      result.current.setSuccess();
    });
    expect(result.current.isLoading).toBe(false);

    // Error
    act(() => {
      result.current.setError();
    });
    expect(result.current.isLoading).toBe(false);
  });
});
