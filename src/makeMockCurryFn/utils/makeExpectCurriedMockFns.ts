type MakeExpectCurriedMockFnsSetup = { mockFns: jest.Mock[]; index: number }

export const makeExpectCurriedMockFns = (
  setup: MakeExpectCurriedMockFnsSetup
) => (...expectedFnArgs: any[]) => {
  const { mockFns, index } = setup

  doMatchedMockFnAssertion(setup, expectedFnArgs)

  const shouldReturnCurriedFn = index < mockFns.length - 1
  if (!shouldReturnCurriedFn) {
    return undefined
  }
  return makeExpectCurriedMockFns({ ...setup, index: index + 1 })
}

const doMatchedMockFnAssertion = (
  setup: MakeExpectCurriedMockFnsSetup,
  expectedFnArgs: any[]
): void => {
  const { mockFns, index } = setup

  const isWithinIndex = index < mockFns.length
  if (!isWithinIndex) {
    return
  }

  const matchedMockFn = mockFns[index]
  expect(matchedMockFn).toHaveBeenCalledWith(...expectedFnArgs)
}
