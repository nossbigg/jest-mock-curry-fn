import { MakeMockCurryFnOptions, MakeMockCurryFnReturn } from "./typedefs";

export const makeMockCurryFn = (
  options: MakeMockCurryFnOptions
): MakeMockCurryFnReturn => {
  const { nCurriedFns, tailFnReturnValue } = options;

  const mockFns: jest.Mock[] = new Array(nCurriedFns)
    .fill(0)
    .map(() => jest.fn());
  const headMockFn = mockFns[0];

  const tailMockFnIndex = nCurriedFns - 1;
  const tailMockFn = mockFns[tailMockFnIndex];

  const chainCurriedMockFnsReturns = () => {
    for (let i = 0; i < mockFns.length - 1; i++) {
      const currentMockFn = mockFns[i];
      const nextMockFn = mockFns[i + 1];
      currentMockFn.mockReturnValue(nextMockFn);
    }
  };
  chainCurriedMockFnsReturns();

  const setTailCurriedFnReturnValue = () => {
    mockFns[nCurriedFns - 1].mockReturnValue(tailFnReturnValue);
  };
  setTailCurriedFnReturnValue();

  const makeExpectCurriedMockFns = (index: number) => (
    ...expectedFnArgs: any[]
  ) => {
    if (index >= mockFns.length - 1) {
      return undefined;
    }

    const matchedMockFn = mockFns[index];
    expect(matchedMockFn).toHaveBeenCalledWith(...expectedFnArgs);
    return makeExpectCurriedMockFns(index + 1);
  };
  const expectMockFnsCalledWith = makeExpectCurriedMockFns(0);

  return {
    expectMockFnsCalledWith,
    headMockFn,
    tailMockFn,
    mockFns,
    options,
  };
};
