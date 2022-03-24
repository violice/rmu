import * as React from 'react';
import { ReactNode } from 'react';
import { TestContext } from './test-context';

const TestProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <TestContext.Provider value={{ count }}>{children}</TestContext.Provider>
  );
};

export default TestProvider;
