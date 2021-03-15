# jest-mock-curry-fn

[![npm version](https://badge.fury.io/js/jest-mock-curry-fn.svg)](https://badge.fury.io/js/jest-mock-curry-fn)

Easier testing with curry functions + jest 🧪

# Who's it for?

1. You use **curried functions** (see more: [Curry and Function Composition](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983))
1. You would like to **mock away certain curried functions** (eg. XHR calls) for ease of testing
1. You need unit tests to assert that these **curried functions are called correctly**
1. You **don't want to write so much setup code** for testing curried functions

# Scenario

```javascript
// makeName.ts
export const makeName = (name) => {
  const prefix = stringPrefixer('first')('second')
  const result = `${prefix} ${name}`
  return result
}

// stringPrefixer.ts
export const stringPrefixer = (first) => (second) => {
  return `${first}-${second}`
}
```

Scenario: 
- System Under Test is `makeName()`
- When `makeName()` is called (eg. `makeName('whee!)`),
- Then we expect that `stringPrefixer` has been called with:
  - 1st mock: `('first')`
  - 2nd mock: `('second')`
  - Returned value: `hey! whee!`

# Usage

```javascript
// 1. import makeMockCurryFn()
import { makeMockCurryFn } from 'jest-mock-curry-fn'

// 2. import function under test
import { makeName } from './makeName'

// 3. import underlying function that requires mocking
import * as stringPrefixerImport from './stringPrefixer'

test('asserts curry fn is called', () => {
  // 4. create mocked curry fn
  const mockStringPrefixerFn = makeMockCurryFn({
    nCurriedFns: 2,
    tailFnReturnValue: 'hey!',
  })

  // 5. mock stringPrefixer() usage
  jest
    .spyOn(stringPrefixerImport, 'stringPrefixer')
    .mockImplementation(mockStringPrefixerFn.headMockFn)

  // 6. trigger usage of top-level function
  const result = makeName('whee!')

  // 7. assert curry fn calls
  mockStringPrefixerFn.expectMockFnsCalledWith('first')('second')

  // 8. assert return value
  expect(result).toEqual('hey! whee!')
})
```

See more: [sampleUsage.test.ts](/src/test/sampleUsage/sampleUsage.test.ts)

# API

```javascript
const options = {
  // required: number of nested curried fns, must be >= 1
  nCurriedFns: 2,
  // required: return value of last curried fn
  tailFnReturnValue: 'hey!',
}

const mockCurryFn = makeMockCurryFn(options)

const {
  // to assert curried fns to be called with certain arguments
  expectMockFnsCalledWith,
  // head fn to be used as the entrypoint for the curried fn to be used
  headMockFn,
  // tail fn to be called at the end of the chained curried fns
  tailMockFn,
  // list of mock fns (chained together to work in curry scenario)
  mockFns,
  // initial options used to initialize current curryFn
  options,
} = mockCurryFn
```

See more: [makeMockCurryFn.ts](/src/makeMockCurryFn/makeMockCurryFn.ts)

Tips: 
- For most use cases, you will only need to use `headMockFn` and `expectMockFnsCalledWith()`.
- For other advanced cases, can access individual `mockFns` to modify underlying `jest.fn()`s to suit your scenario.
  - Eg. Asserting specific mock function not to be called with certain argument.
  - Eg. Modifying `tailMockFn` to return different return value depending on how the function is called.