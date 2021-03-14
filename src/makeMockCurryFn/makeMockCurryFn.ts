import {
  validateMockCurryFnOptions,
  makeMockFns,
  chainMockCurryFnsReturns,
  setTailMockFnReturnValue,
  makeExpectCurriedMockFns,
} from "./utils";
import { MakeMockCurryFnOptions, MakeMockCurryFnReturn } from "./typedefs";

export const makeMockCurryFn = (
  options: MakeMockCurryFnOptions
): MakeMockCurryFnReturn => {
  const { nCurriedFns, tailFnReturnValue } = options;

  validateMockCurryFnOptions(options);

  const mockFns = makeMockFns(nCurriedFns);
  const tailMockFnIndex = nCurriedFns - 1;

  const headMockFn = mockFns[0];
  const tailMockFn = mockFns[tailMockFnIndex];

  chainMockCurryFnsReturns(mockFns);

  setTailMockFnReturnValue(mockFns, tailFnReturnValue);

  const expectMockFnsCalledWith = makeExpectCurriedMockFns({
    mockFns,
    index: 0,
  });

  return {
    expectMockFnsCalledWith,
    headMockFn,
    tailMockFn,
    mockFns,
    options,
  };
};
