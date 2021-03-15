import { makeMockCurryFn } from './makeMockCurryFn'

describe('makeMockCurryFn', () => {
  const doTest = () => {
    const curryFn = makeMockCurryFn({ nCurriedFns: 3, tailFnReturnValue: 123 })
    const { headMockFn } = curryFn

    const result = headMockFn(1)(2)(3)

    return { curryFn, result }
  }

  it('returns correct tail fn value', () => {
    const { result } = doTest()
    expect(result).toEqual(123)
  })

  it('does assertions on mock fns correctly', () => {
    const {
      curryFn: { expectMockFnsCalledWith },
    } = doTest()
    expectMockFnsCalledWith(1)(2)(3)
  })

  it('passes options', () => {
    const {
      curryFn: { options },
    } = doTest()
    const expectedOptions = { nCurriedFns: 3, tailFnReturnValue: 123 }
    expect(options).toEqual(expectedOptions)
  })

  describe('mock fns', () => {
    it('returns correct number of mock fns', () => {
      const {
        curryFn: { mockFns },
      } = doTest()
      expect(mockFns.length).toEqual(3)
    })

    it('returns correct head fn', () => {
      const {
        curryFn: { mockFns, headMockFn },
      } = doTest()
      expect(headMockFn).toBe(mockFns[0])
    })

    it('returns correct tail fn', () => {
      const {
        curryFn: { mockFns, tailMockFn },
      } = doTest()
      expect(tailMockFn).toBe(mockFns[2])
    })
  })

  describe('nCurriedFns value', () => {
    it('accepts nCurriedFns = 1', () => {
      expect(() => {
        makeMockCurryFn({ nCurriedFns: 3, tailFnReturnValue: 123 })
      }).not.toThrowError()
    })

    it('throws error owhen nCurriedFns <= 0', () => {
      const expectedErrorMsg =
        "makeMockCurryFn() init error: 'nCurriedFns' must be >= 1"
      expect(() => {
        makeMockCurryFn({ nCurriedFns: 0, tailFnReturnValue: 123 })
      }).toThrowError(expectedErrorMsg)
    })
  })
})
