export const setTailMockFnReturnValue = (
  mockFns: jest.Mock[],
  tailFnReturnValue: any
) => {
  const tailFnIndex = mockFns.length - 1;
  mockFns[tailFnIndex].mockReturnValue(tailFnReturnValue);
};
