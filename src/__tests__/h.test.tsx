import { h } from '../dom'

const buildVNode = (type?, props?, children = []) => ({
  type,
  children,
  props: props || {}
  // key: attributes && attributes.key
})

test('JSX: Should render a simple structure', () => {
  const template = () =>
    h(
      'footer',
      { class: 'footer' },
      h('span', { class: 'todo-count' }, h('strong', null, '0'), ' item left'),
      h(
        'ul',
        { class: 'filters' },
        h('li', null, h('a', { class: 'selected', href: '#/' }, 'All')),
        h('li', null, h('a', { href: '#/active' }, 'Active')),
        h('li', null, h('a', { href: '#/completed' }, 'Completed'))
      ),
      h('button', { class: 'clear-completed' }, 'Clear completed'),
      h('input', {
        class: 'new-todo',
        placeholder: 'What needs to be done?',
        autofocus: true
      })
    )

  // const obj = {'children': [{'children': [{'children': ['0'], 'props': {}, 'type': 'strong'}, ' item left'], 'props': { 'class': 'todo-count' }, 'type': 'span' }, { 'children': [{ 'children': [{ 'children': ['All'], 'props': { 'class': 'selected', 'href': '#/' }, 'type': 'a' }], 'props': {}, 'type': 'li' }, { 'children': [{ 'children': ['Active'], 'props': { 'href': '#/active' }, 'type': 'a' }], 'props': {}, 'type': 'li' }, { 'children': [{ 'children': ['Completed'], 'props': { 'href': '#/completed' }, 'type': 'a' }], 'props': {}, 'type': 'li' }], 'props': { 'class': 'filters' }, 'type': 'ul' }, { 'children': ['Clear completed'], 'props': { 'class': 'clear-completed' }, 'type': 'button' }, { 'children': [], 'props': { 'autofocus': true, 'class': 'new-todo', 'placeholder': 'What needs to be done?' }, 'type': 'input' }], 'props': { 'class': 'footer' }, 'type': 'footer' }
  const obj = {
    children: [
      {
        children: [{ children: ['0'], props: {}, type: 'strong' }, ' item left' ],
        props: { class: 'todo-count' },
        type: 'span'
      },
      {
        children: [
          {
            children: [{ children: ['All'], props: { class: 'selected', href: '#/' }, type: 'a' }],
            props: {},
            type: 'li'
          },
          {
            children: [{ children: ['Active'], props: { href: '#/active' }, type: 'a' }],
            props: {},
            type: 'li'
          },
          {
            children: [{ children: ['Completed'], props: { href: '#/completed' }, type: 'a' }],
            props: {},
            type: 'li'
          }
        ],
        props: { class: 'filters' },
        type: 'ul'
      },
      { children: ['Clear completed'], props: { class: 'clear-completed' }, type: 'button' },
      {
        children: [],
        props: { autofocus: true, class: 'new-todo', placeholder: 'What needs to be done?' },
        type: 'input'
      }
    ],
    props: { class: 'footer' },
    type: 'footer'
  }
  expect(template()).toEqual(obj)
})

test('should handle no props', () => {
  expect(
    h('h1')
  ).toEqual({ 'children': [], 'props': {}, 'type': 'h1' })
})

// test.only('should handle shorthand element with children and no props', () => {
//   expect(
//     h('h1', 'test')
//   ).toEqual({ 'children': ['test'], 'props': {}, 'type': 'h1' })
// })

test('should handle multiple element children, given as an array', () => {
  const r = h('foo', null, [ h('bar'), h('baz', null, h('test')) ])

  expect(r).toHaveProperty('children', [
    buildVNode('bar'),
    buildVNode('baz', undefined, [buildVNode('test')])
  ])
})

test('JSX test2 - composability', () => {
  const Hello = () => <h1 class='bar'>Hello world</h1>
  const Wrapper = () => (
    <div class='foo'>
      <Hello />
    </div>
  )

  const html = () => (
    <div class='foo'>
      <h1 class='bar'>Hello world</h1>
    </div>
  )
  expect(Wrapper()).toEqual(html())
})

test('JSX test 3 - composability with children', () => {
  const Hello = () => <h1 className='bar'>Hello world</h1>
  const Wrapper = ({ children }) => <div class='foo'>{children}</div>
  const html = () => <Wrapper>hello world</Wrapper>

  expect(html()).toEqual({ children: ['hello world'], props: { class: 'foo' }, type: 'div' })
})

const Container = ({ children }) => <div class='container'>{children}</div>
const Title1 = <h1 class='Title1'>Hello world</h1>
const Title2 = () => <h1 class='Title2'>Hello world</h1>
const Wrapper1 = () => (
  <Container>
    <Title1 />
  </Container>
)

test('Wrapper1', () => {
  const Wrapper1H = () => h(Container, null, h(Title1, null))
  expect(Wrapper1()).toEqual(Wrapper1H())
})

test('JSX test 4.1 - nested composability', () => {
  expect(Title1).toEqual(h('h1', { class: 'Title1' }, 'Hello world'))
})

test('JSX test 4.2 - nested composability', () => {
  const Wrapper1H = () => h(Container, null, h(Title1, null))
  expect(Wrapper1()).toEqual(Wrapper1H())
})

test('JSX test 4.2 - nested composability', () => {
  const A = ({ children }) => <div>{children}</div>
  const B = () => <b>Hi</b>
  const C = () => (
    <A>
      <B />
    </A>
  )

  expect(C()).toEqual(
    <div>
      <b>Hi</b>
    </div>
  )
  expect(C()).toEqual({
    children: [{ children: ['Hi'], props: {}, type: 'b' }],
    props: {},
    type: 'div'
  })
})

test('JSX test 4.3- nested composability', () => {
  const A = ({ children }) => <div class='A'>{children}</div>
  const B = () => <b>Hi</b>
  const C = () => (
    <A>
      <B />
    </A>
  )

  expect(C()).toEqual(
    <div class='A'>
      <b>Hi</b>
    </div>
  )
  expect(C()).toEqual({
    children: [
      {
        children: ['Hi'],
        props: {},
        type: 'b'
      }
    ],
    props: { class: 'A' },
    type: 'div'
  })
})

test('JSX test 4.4 - nested composability', () => {
  const A = ({ children }) => <div class='A'>{children}</div>
  const B = () => <h1 class='Title1'>Hello world</h1>
  const C = () => (
    <A>
      <B />
    </A>
  )

  expect(C()).toEqual(
    <div class='A'>
      <h1 class='Title1'>Hello world</h1>
    </div>
  )

  expect(C()).toEqual({
    children: [
      {
        children: ['Hello world'],
        props: { class: 'Title1' },
        type: 'h1'
      }
    ],
    props: { class: 'A' },
    type: 'div'
  })
})

test('JSX test 4.5 - nested composability', () => {
  const Container = ({ children }) => <div class='container'>{children}</div>
  const Title1 = <h1 class='Title1'>Hello world</h1>
  const Wrapper1 = () => (
    <Container>
      <Title1 />
    </Container>
  )

  expect(Wrapper1()).toEqual({
    children: [
      {
        children: [],
        props: {},
        type: { children: ['Hello world'], props: { class: 'Title1' }, type: 'h1' }
      }
    ],
    props: { class: 'container' },
    type: 'div'
  })
})

test('JSX test 4.6 - nested composability', () => {
  const Container = ({ children }) => <div class='container'>{children}</div>
  const Title2 = () => <h1 class='Title2'>Hello world</h1>
  const Wrapper1 = () => (
    <Container>
      <Title2 />
    </Container>
  )

  expect(Wrapper1()).toEqual({
    children: [
      {
        children: ['Hello world'],
        props: { class: 'Title2' },
        type: 'h1'
      }
    ],
    props: { class: 'container' },
    type: 'div'
  })

  // test('JSX test 4.2 - nested composability', () => {
  //   expect(Wrapper1()).toEqual(
  //     <div class='container'>
  //       <h1 class='Title1'>Hello world</h1>
  //     </div>
  //   )
})

test('Single Node', () => {
  const A1 = () => <div />
  // tslint:disable-next-line:jsx-self-close
  const A2 = () => <div />
  expect(A1()).toEqual({
    children: [],
    props: {},
    type: 'div'
  })
  expect(A1()).toEqual(A2())
})

test('Passing attributes', () => {
  const A = props => <div class='A-prop'>{props.myprop}</div>
  const B = () => <A myprop='myval' />

  expect(B()).toEqual(<div class='A-prop'>myval</div>)

  expect(B()).toEqual({
    children: ['myval'],
    props: { class: 'A-prop' },
    type: 'div'
  })
})

test('Passing onClick attributes', () => {
  const clickHandler = () => null

  const A = () =>
    <div onClick={clickHandler} class='a-prop' />

  expect(A().props.onClick).toBe(clickHandler)

})

test('Advanced nesting', () => {
  const names = [ 'Scott', 'Seth', 'Bob', 'Joe' ]
  const listNames = () =>
    names.map(name => <li key={name.toLocaleLowerCase()}>{name.toUpperCase()}</li>)

  const A = ({ children }) => <div class='container'>{children}</div>
  const B = ({ children, title }) => (
    <section class='mysection'>
      <strong>{title}</strong>
      {children}
    </section>
  )

  const C = () => (
    <ul>
      <li>--start--</li>
      {listNames()}
      <li>--end--</li>
    </ul>
  )

  const D1 = ({ isTrue = true }) => <div title='foobar' isTrue={isTrue} />
  const D2 = <div title='foobar' isTrue={true} />
  const D3 = ({ isTrue }) => <D1 title='foobar' isTrue={isTrue} />

  expect(D1({ isTrue: true })).toEqual({
    children: [],
    props: { isTrue: true, title: 'foobar' },
    type: 'div'
  })

  expect(D2).toEqual({
    children: [],
    props: { isTrue: true, title: 'foobar' },
    type: 'div'
  })

  expect(D3({ isTrue: false })).toEqual({
    children: [],
    props: { isTrue: false, title: 'foobar' },
    type: 'div'
  })

  expect(
    <A>
      <B title='foobar'>
        <C />
      </B>
    </A>
  ).toEqual({
    children: [
      {
        children: [
          { children: ['foobar'], props: {}, type: 'strong' },
          {
            children: [
              { children: ['--start--'], props: {}, type: 'li' },
              { children: ['SCOTT'], props: { key: 'scott' }, type: 'li' },
              { children: ['SETH'], props: { key: 'seth' }, type: 'li' },
              { children: ['BOB'], props: { key: 'bob' }, type: 'li' },
              { children: ['JOE'], props: { key: 'joe' }, type: 'li' },
              { children: ['--end--'], props: {}, type: 'li' }
            ],
            props: {},
            type: 'ul'
          }
        ],
        props: { class: 'mysection' },
        type: 'section'
      }
    ],
    props: { class: 'container' },
    type: 'div'
  })
})
