export type MakeMockCurryFnOptions = {
  nCurriedFns: number
  tailFnReturnValue: any
}

export type MakeMockCurryFnReturn = {
  expectMockFnsCalledWith: Function
  headMockFn: jest.Mock
  tailMockFn: jest.Mock
  mockFns: jest.Mock[]
  options: MakeMockCurryFnOptions
}
