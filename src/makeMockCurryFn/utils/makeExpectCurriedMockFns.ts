type MakeExpectCurriedMockFnsSetup = { mockFns: jest.Mock[]; index: number }

export const makeExpectCurriedMockFns = (
  setup: MakeExpectCurriedMockFnsSetup
) => (...expectedFnArgs: any[]) => {
  const { mockFns, index } = setup

  if (index >= mockFns.length - 1) {
    return undefined
  }

  const matchedMockFn = mockFns[index]
  expect(matchedMockFn).toHaveBeenCalledWith(...expectedFnArgs)
  return makeExpectCurriedMockFns({ ...setup, index: index + 1 })
}
