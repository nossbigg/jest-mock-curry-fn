import { MakeMockCurryFnOptions } from "../typedefs";

const nCurriedFnsInitErrorMessage =
  "makeMockCurryFn() init error: 'nCurriedFns' must be >= 1";

export const validateMockCurryFnOptions = (options: MakeMockCurryFnOptions) => {
  const { nCurriedFns } = options;
  if (nCurriedFns <= 0) {
    throw new Error(nCurriedFnsInitErrorMessage);
  }
};
