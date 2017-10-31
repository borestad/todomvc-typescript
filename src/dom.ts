type KV = {[key: string]: any}

const { entries, keys } = Object
const doc = typeof document === 'undefined' ? null : document

export const isObject = v => v != null && typeof v === 'object' && !Array.isArray(v)
export const isBoolean = v => v === false || v === true
export const toEventName = (s = '') => s.slice(2).toLowerCase()
export const isEventProp = v => /^on/.test(v)

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

export function h (type: string | Function, props?: any, ...children: any[]) {
  let c, stack = [];
  (props = props || {}).children && delete props.children
  children.length > 1 && children.reverse()

  while (children.length && (c = children.pop())) {
    if (c.pop) children.push(...(c.length > 1 ? c.reverse() : c))
    else if (true !== c) stack.push(c.toFixed ? '' + c : c)
  }

  return (type as Function).call
    ? (type as Function)(props, (props.children = stack))
    : new VNode(type, props, stack)
}

export const classNames = (obj: KV) =>
  entries(obj)
    .reduce((s, [ k, v ]) => (v === true ? `${s} ${k}` : s), '')
    .trim()

export function setProp ($el: Element, name: string, value) {
  if (isEventProp(name) || (name === 'class' && !value)) return
  $el.setAttribute(name, isBoolean(value) ? $el[name] = value : value)
}

export function createElement (vnode: VNode): Element | Text {
  if ((vnode as any).charAt) return doc.createTextNode(vnode as any)

  const $el = doc.createElement(vnode.type)

  entries(vnode.props).forEach(([ p, v ] ) => {
    setProp($el, p, v)
    isEventProp(p) && $el.addEventListener(toEventName(p), v, true)
  })

  vnode.children.map(createElement).forEach($child =>
    $el.appendChild.call($el, $child))

  return $el
}

export function render ($el: HTMLElement, vnode: VNode) {
  let $node, child
  (child = $el.firstChild) && $el.removeChild(child)
  return ($node = $el.insertBefore(createElement(vnode), $node))
}

export const dispatch = o => {
  const ev = new CustomEvent('action', { detail: o.call ? o() : o })
  return doc.dispatchEvent(ev) && ev.detail
}

export const Router = (root) => {
  const q = [], loc = location

  const go = (route = root) => {
    loc.hash = route
    emit()
    return path()
  }

  const path = () => loc.hash.slice(1) || root
  const isActive = route => route === path()
  const onChange = fn => q.push(fn)
  const emit = () => q.forEach(cb => cb(path()))

  window.onhashchange = emit

  return { go, path, isActive, onChange }
}
