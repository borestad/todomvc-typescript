const obj = {
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
}

const res = Object.entries(obj).reduce(
  (name, [ k, v ]) => (v === true ? `${name} ${k}` : ''),
  ''
)

console.log(res)
