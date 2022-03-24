import { createContext } from 'react';

export const TestContext = createContext<{ count: number } | null>(null);
