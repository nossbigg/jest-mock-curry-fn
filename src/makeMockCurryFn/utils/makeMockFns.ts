export const makeMockFns = (nCurriedFns: number) => {
  const mockFns: jest.Mock[] = new Array(nCurriedFns)
    .fill(0)
    .map(() => jest.fn())
  return mockFns
}
