import { h, VNode } from '../dom'
import { classNames, isObject } from '../dom'

test('.isObject(', () => {
  expect(isObject({})).toEqual(true)
  expect(isObject([])).toEqual(false)
  expect(isObject(null)).toEqual(false)
})

describe('.classNames()', () => {
  test('should work', () => {
    expect(classNames('foo')).toEqual('foo')
  })

  test('should properly merge class names and ignore non booleans', () => {
    expect(
      classNames({
        a: 1,
        b: 0,
        c: null,
        d: '',
        e: 'foo',
        f: [],
        g: undefined,
        h: {},
        i: { foo: 'bar' },
        j: 1,
        k: 0,
        l: [1],
        'm-n': true,
        o: true
      })
    ).toEqual('m-n o')
  })
})
