import { stringPrefixer } from './stringPrefixer'

export const makeName = (name) => {
  const prefix = stringPrefixer('first')('second')
  const result = `${prefix} ${name}`
  return result
}
