import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RMUProvider } from './rmu-provider';

describe('RMUProvider', () => {
  it('should render children', () => {
    render(
      <RMUProvider>
        <div data-testid="child">Child Content</div>
      </RMUProvider>
    );

    expect(screen.getByTestId('child')).toBeDefined();
  });
});
