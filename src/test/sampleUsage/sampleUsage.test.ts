// 1. import makeMockCurryFn()
import { makeMockCurryFn } from '../../makeMockCurryFn'

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
