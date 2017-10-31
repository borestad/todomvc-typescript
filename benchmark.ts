const Benchmark = require('benchmark')
import { classNames, h } from './src/dom'
const lorem = require('./test/loremipsum')
const suite = new Benchmark.Suite

const cnames = ({
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

// add tests
suite
.add('h', () => {
  lorem(h)
})
// .add('classnames1', () => {
//   classNames(cnames)
// })
// add listeners
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({ 'async': false })
