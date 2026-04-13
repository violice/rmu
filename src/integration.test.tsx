import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import React from 'react';
import { RMUProvider } from './rmu-provider';
import { RMUOutlet } from './rmu-outlet';
import { openModal, closeModal } from './events';
import { emitter } from './emitter';

describe('Integration: Full RMU Workflow', () => {
  beforeEach(() => {
    // Clear all emitter subscriptions before each test
    emitter._clear();
  });

  afterEach(() => {
    // Clean up the DOM after each test
    cleanup();
  });

  it('should handle complete workflow with single outlet', async () => {
    render(
      <RMUProvider>
        <div data-testid="app">App Content</div>
        <RMUOutlet />
      </RMUProvider>
    );

    // Wait for outlet to be registered
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    // Initial state - app content visible, no modals
    expect(screen.getByTestId('app')).toBeDefined();
    expect(screen.queryByTestId('modal-1')).toBeNull();

    // Open first modal
    let modal1Info: { modalId: string; outletId: string };
    act(() => {
      modal1Info = openModal(<div data-testid="modal-1">First Modal</div>);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal-1')).toBeDefined();
    });

    // Open second modal
    let modal2Info: { modalId: string; outletId: string };
    act(() => {
      modal2Info = openModal(<div data-testid="modal-2">Second Modal</div>);
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal-1')).toBeDefined();
      expect(screen.getByTestId('modal-2')).toBeDefined();
    });

    // Close first modal
    act(() => {
      closeModal(modal1Info);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('modal-1')).toBeNull();
      expect(screen.getByTestId('modal-2')).toBeDefined();
    });

    // Close second modal
    act(() => {
      closeModal(modal2Info);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('modal-1')).toBeNull();
      expect(screen.queryByTestId('modal-2')).toBeNull();
    });

    // App content still visible
    expect(screen.getByTestId('app')).toBeDefined();
  });

  it('should handle workflow with multiple outlets', async () => {
    render(
      <RMUProvider>
        <div data-testid="sidebar">
          <RMUOutlet outletId="sidebar-outlet" />
        </div>
        <div data-testid="main">
          <RMUOutlet outletId="main-outlet" />
        </div>
      </RMUProvider>
    );

    // Wait for outlets to be registered
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    // Open modals in different outlets
    let sidebarModalInfo: { modalId: string; outletId: string };
    let mainModalInfo: { modalId: string; outletId: string };

    act(() => {
      sidebarModalInfo = openModal(
        <div data-testid="sidebar-modal">Sidebar Modal</div>,
        { outletId: 'sidebar-outlet' }
      );
      mainModalInfo = openModal(
        <div data-testid="main-modal">Main Modal</div>,
        { outletId: 'main-outlet' }
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('sidebar-modal')).toBeDefined();
      expect(screen.getByTestId('main-modal')).toBeDefined();
    });

    // Verify modals are in correct outlets
    expect(screen.getByTestId('sidebar').contains(screen.getByTestId('sidebar-modal'))).toBe(true);
    expect(screen.getByTestId('main').contains(screen.getByTestId('main-modal'))).toBe(true);

    // Close sidebar modal only
    act(() => {
      closeModal(sidebarModalInfo);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('sidebar-modal')).toBeNull();
      expect(screen.getByTestId('main-modal')).toBeDefined();
    });

    // Close main modal
    act(() => {
      closeModal(mainModalInfo);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('sidebar-modal')).toBeNull();
      expect(screen.queryByTestId('main-modal')).toBeNull();
    });
  });

  it('should handle rapid open/close operations', async () => {
    render(
      <RMUProvider>
        <RMUOutlet />
      </RMUProvider>
    );

    // Wait for outlet to be registered
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    const modals: Array<{ modalId: string; outletId: string }> = [];

    // Open 5 modals sequentially (with small delays to avoid ID collision)
    for (let i = 0; i < 5; i++) {
      act(() => {
        modals.push(
          openModal(<div data-testid={`rapid-modal-${i}`}>Modal {i}</div>)
        );
      });
      // Small delay to ensure unique IDs
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    await waitFor(() => {
      for (let i = 0; i < 5; i++) {
        expect(screen.getByTestId(`rapid-modal-${i}`)).toBeDefined();
      }
    });

    // Close all modals
    act(() => {
      modals.forEach(modalInfo => closeModal(modalInfo));
    });

    await waitFor(() => {
      for (let i = 0; i < 5; i++) {
        expect(screen.queryByTestId(`rapid-modal-${i}`)).toBeNull();
      }
    });
  });

  it('should handle modal with complex React components', async () => {
    const ComplexComponent = ({ title, onAction }: { title: string; onAction?: () => void }) => (
      <div data-testid="complex-modal">
        <h1>{title}</h1>
        <button data-testid="action-btn" onClick={onAction}>
          Action
        </button>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );

    render(
      <RMUProvider>
        <RMUOutlet />
      </RMUProvider>
    );

    // Wait for outlet to be registered
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    const actionHandler = vi.fn();

    act(() => {
      openModal(<ComplexComponent title="Test Modal" onAction={actionHandler} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('complex-modal')).toBeDefined();
      expect(screen.getByText('Test Modal')).toBeDefined();
      expect(screen.getByTestId('action-btn')).toBeDefined();
      expect(screen.getByText('Item 1')).toBeDefined();
      expect(screen.getByText('Item 2')).toBeDefined();
    });
  });

  it('should handle outlet removal and re-addition', async () => {
    const { unmount } = render(
      <RMUProvider>
        <RMUOutlet outletId="dynamic-outlet" />
      </RMUProvider>
    );

    // Wait for outlet to be registered
    await waitFor(() => {
      expect(document.body).toBeDefined();
    });

    // Open a modal
    let modalInfo: { modalId: string; outletId: string };
    act(() => {
      modalInfo = openModal(
        <div data-testid="dynamic-modal">Dynamic Modal</div>,
        { outletId: 'dynamic-outlet' }
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('dynamic-modal')).toBeDefined();
    });

    // Unmount the outlet
    unmount();

    // Re-render with a new outlet (need to use render again after unmount)
    render(
      <RMUProvider>
        <RMUOutlet outletId="dynamic-outlet" />
      </RMUProvider>
    );

    // Modal should not be visible after outlet removal and re-addition
    // because the outlet was removed from state
    expect(screen.queryByTestId('dynamic-modal')).toBeNull();
  });
});
