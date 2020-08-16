import '@testing-library/jest-dom';

const originalConsoleError = console.error;

// If a Prop-type error occurred during rendering a React component,
// that error will throw an error so that it can be detected via Jest
console.error = (message: string) => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};
