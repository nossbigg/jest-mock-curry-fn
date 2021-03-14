export const chainMockCurryFnsReturns = (mockFns: jest.Mock[]): void => {
  for (let i = 0; i < mockFns.length - 1; i++) {
    const currentMockFn = mockFns[i];
    const nextMockFn = mockFns[i + 1];
    currentMockFn.mockReturnValue(nextMockFn);
  }
};
