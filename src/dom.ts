type KV = {[key: string]: any}

const { entries, keys } = Object
const { isArray } = Array
const doc = document

/**
 * memoize
 */
// export function memoize<R, T extends (...args: any[]) => R> (fn: T): T {
//   const c = {}
//   let k
//   return ((...args) => {
//     k = args.length === 1 ? args[0] : JSON.stringify(args)
//     return c[k] || (c[k] = fn.call(null, ...args))
//   }) as T
// }

/**
 * isObject
 */
export function isObject (v) {
  return v != null && typeof v === 'object' && !isArray(v)
}

/**
 * toEventName
 */
export function toEventName (s: string) {
  return (s || '').slice(2).toLowerCase()
}

/**
 * isEventProp
 */
export function isEventProp (v) {
  return /^on/.test(v)
}

/**
 * VNode
 */
export class VNode {
  type: string
  props: KV
  children: any[]
  constructor (type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

/**
 * h
 */
export function h (type: string | Function, props?: any, ...children: any[]) {
  const stack = []
  let c
  (props = props || {}).children && (props.children = void 0)
  children.length > 1 && children.reverse()

  while (children.length && (c = children.pop())) {
    if (c.pop) children.push(...(c.length > 1 ? c.reverse() : c))
    else if (true !== c) stack.push(c.toFixed ? '' + c : c)
  }

  return (type as Function).call
    ? (type as Function)(props, (props.children = stack))
    : new VNode(type, props, stack)
}

/**
 * classNames
 */
export const classNames = (obj?: KV) => {
  return entries(obj)
    .reduce((name, [ k, v ]) => (v === true ? `${name} ${k}` : name), '')
    .trim()
}

/**
 * setProp
 */
export function setProp ($el: Element, name: string, value) {
  if (isEventProp(name) || (name === 'class' && !value)) return
  if (value === false || value === true) $el[name] = value
  $el.setAttribute(name, value)
}

/**
 * createElement
 */
export function createElement (vnode: VNode): Element | Text {
  if ((vnode as any).charAt) return doc.createTextNode(vnode as any)

  const $el = doc.createElement(vnode.type)

  for (const [ prop, val ] of entries(vnode.props)) {
    setProp($el, prop, val)
  }

  for (const name of keys(vnode.props).filter(isEventProp)) {
    $el.addEventListener(toEventName(name), vnode.props[name], true)
  }

  for (const $child of vnode.children.map(createElement)) {
    $el.appendChild.call($el, $child)
  }

  return $el
}

/**
 * render
 */
export function render ($el: HTMLElement, vnode: VNode) {
  let $node
  $el.firstChild && $el.removeChild($el.firstChild)
  return ($node = $el.insertBefore(createElement(vnode), $node))
}

export const dispatch = o => {
  const ev = new CustomEvent('action', { detail: o.call ? o() : o })
  doc.dispatchEvent(ev)
  return ev.detail
}

export const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem('store')) as any
  } catch (e) {
    console.error(e)
  }
}

export function tags<K extends string> (...type: K[]): {[P in K] } {
  const tags: any = {}

  for (const tag of type) {
    tags[tag] = h.bind(null, tag) as Function
  }

  return tags as {[P in K]
  }
}

export const Router = (root) => {
  const q = []

  const go = (route) => {
    location.hash = route
    emit()
    return path()
  }

  const path = () => location.hash.slice(1) || root
  const isActive = route => route === path()
  const onChange = (fn) => q.push(fn)
  const emit = () => q.forEach(cb => cb(path()))

  window.onhashchange = emit

  return { go, path, isActive, onChange }
}
