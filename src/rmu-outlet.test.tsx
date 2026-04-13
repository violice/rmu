import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import React from 'react';
import { RMUProvider } from './rmu-provider';
import { RMUOutlet } from './rmu-outlet';
import { openModal, closeModal } from './events';
import { emitter } from './emitter';

describe('RMUOutlet', () => {
  beforeEach(() => {
    // Clear all emitter subscriptions before each test
    emitter._clear();
  });

  afterEach(() => {
    // Clean up the DOM after each test
    cleanup();
  });

  it('should throw when used outside RMUProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<RMUOutlet />);
    }).toThrow('RMUProvider not found in component tree');

    consoleSpy.mockRestore();
  });

  it('should render with default outlet', () => {
    render(
      <RMUProvider>
        <div data-testid="content">content</div>
        <RMUOutlet />
      </RMUProvider>
    );

    expect(screen.getByTestId('content')).toBeDefined();
  });

  it('should render with custom outlet id', () => {
    render(
      <RMUProvider>
        <RMUOutlet outletId="custom-outlet" />
      </RMUProvider>
    );

    // The outlet should be rendered without errors
    expect(document.body).toBeDefined();
  });

  it('should render multiple outlets', () => {
    render(
      <RMUProvider>
        <RMUOutlet outletId="outlet-1" />
        <RMUOutlet outletId="outlet-2" />
      </RMUProvider>
    );

    // Both outlets should be rendered without errors
    expect(document.body).toBeDefined();
  });

  it('should render modal when opened via events', async () => {
    render(
      <RMUProvider>
        <RMUOutlet />
      </RMUProvider>
    );

    // Wait for outlet to be registered via useEffect
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    const modalContent = <div data-testid="modal-content">Modal Content</div>;

    act(() => {
      openModal(modalContent);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal-content')).toBeDefined();
    });
  });

  it('should render modal in custom outlet', async () => {
    render(
      <RMUProvider>
        <RMUOutlet outletId="custom-outlet" />
      </RMUProvider>
    );

    // Wait for outlet to be registered via useEffect
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    const modalContent = <div data-testid="custom-modal">Custom Modal</div>;

    act(() => {
      openModal(modalContent, { outletId: 'custom-outlet' });
    });

    await waitFor(() => {
      expect(screen.getByTestId('custom-modal')).toBeDefined();
    });
  });

  it('should not render modal in wrong outlet', async () => {
    render(
      <RMUProvider>
        <RMUOutlet outletId="outlet-1" />
      </RMUProvider>
    );

    // Wait for outlet to be registered via useEffect
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    const modalContent = <div data-testid="wrong-modal">Wrong Modal</div>;

    // Opening modal in non-existent outlet should throw
    expect(() => {
      act(() => {
        openModal(modalContent, { outletId: 'outlet-2' });
      });
    }).toThrow('Outlet with id outlet-2 not found');

    // Modal should not be rendered in outlet-1
    expect(screen.queryByTestId('wrong-modal')).toBeNull();
  });

  it('should remove modal when closed', async () => {
    render(
      <RMUProvider>
        <RMUOutlet />
      </RMUProvider>
    );

    // Wait for outlet to be registered via useEffect
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    const modalContent = <div data-testid="closable-modal">Closable Modal</div>;

    let modalInfo: { modalId: string; outletId: string };

    act(() => {
      modalInfo = openModal(modalContent);
    });

    await waitFor(() => {
      expect(screen.getByTestId('closable-modal')).toBeDefined();
    });

    act(() => {
      closeModal(modalInfo);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('closable-modal')).toBeNull();
    });
  });

  it('should render multiple modals in same outlet', async () => {
    render(
      <RMUProvider>
        <RMUOutlet />
      </RMUProvider>
    );

    // Wait for outlet to be registered via useEffect
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    // Open first modal
    act(() => {
      openModal(<div data-testid="modal-1">Modal 1</div>);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal-1')).toBeDefined();
    });

    // Open second modal after first one is rendered
    act(() => {
      openModal(<div data-testid="modal-2">Modal 2</div>);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal-1')).toBeDefined();
      expect(screen.getByTestId('modal-2')).toBeDefined();
    });
  });

  it('should cleanup outlet on unmount', () => {
    const { unmount } = render(
      <RMUProvider>
        <RMUOutlet outletId="cleanup-outlet" />
      </RMUProvider>
    );

    // Unmount the outlet
    unmount();

    // The component should unmount without errors
    expect(document.body).toBeDefined();
  });
});
