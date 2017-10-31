import { h, VNode } from '../dom'
import { classNames, isEventProp, isObject } from '../dom'

test('.isObject()', () => {
  expect(isObject({})).toEqual(true)
  expect(isObject([])).toEqual(false)
  expect(isObject(null)).toEqual(false)
})

test('.isEventProp()(', () => {
  expect(isEventProp('onCreate')).toEqual(true)

  const falsy = [ false, null, true, [], {}, undefined, '', 1, 0, 'foo' ]
  falsy.forEach(v => {
    expect(isEventProp(v)).toEqual(false)
  })

})

describe('.classNames()', () => {

  test('should work', () => {
    expect(
      classNames({
        completed: true,
        editing: false
      }))
    .toEqual('completed')
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

// describe('.parseSelector()', () => {

//   test('case1', () => {

//     expect(parseSelector('div')).toEqual({
//       type: 'div'
//     })

//     expect(parseSelector('.bar')).toEqual({
//       type: 'div',
//       class: 'bar'
//     })

//     expect(parseSelector('#bar')).toEqual({
//       type: 'div',
//       id: 'bar'
//     })

//     expect(parseSelector('p')).toEqual({
//       type: 'p'
//     })

//     expect(parseSelector('p.bar.baz')).toEqual({
//       type: 'p',
//       class: 'bar baz'
//     })

//     expect(parseSelector('p#foo.bar.baz')).toEqual({
//       type: 'p',
//       class: 'bar baz',
//       id: 'foo'
//     })

//     expect(parseSelector('#foo.bar.baz')).toEqual({
//       type: 'div',
//       class: 'bar baz',
//       id: 'foo'
//     })

//     expect(parseSelector('foo.bar')).toEqual({
//       type: 'foo',
//       class: 'bar'
//     })

//   })
// })
