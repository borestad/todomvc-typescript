type KV = { [key: string]: any }

const { entries, keys } = Object
const { isArray } = Array

/**
 * memoize
 */
function memoize<R, T extends (...args: any[]) => R> (fn: T): T {
  const c = {}
  let k
  return ((...args) => {
    k = args.length === 1 ? args[0] : JSON.stringify(args)
    return c[k] || (c[k] = fn.call(null, ...args))
  }) as T
}

/**
 * isObject
 */
const isObject = v =>
  v != null && typeof v === 'object' && !isArray(v)

/**
 * toEventName
 */
const toEventName = (s: string) =>
  s.slice(2).toLowerCase()

/**
 * isEventProp
 */
export const isEventProp = (v?) =>
  'on' === ''.slice.call(v || '', 0, 2) && v.toLowerCase()

/**
 * VNode
 */
class VNode {
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
function h (type: string | Function, props?: any, ...children: any[]) {
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
const classNames = (classNames?: string | KV, obj?: KV) => {
  isObject(classNames) ?
    [ obj, classNames ] = [ classNames as KV, '' ] :
    [obj] = [{}]

  return (`${classNames} `
    + entries(obj).reduce((name, [ k, v ]) =>
      v === true ? `${name} ${k}` : '', '')).trim()
}

/**
 * setProp
 */
function setProp ($el: Element, name: string, value) {
  if (isEventProp(name) || (name === 'class' && !value)) return
  if (typeof value === 'boolean') $el[name] = value
  $el.setAttribute(name, value)
}

/**
 * createElement
 */
function createElement (vnode: VNode): Element | Text {
  if ((vnode as any).charAt)
    return document.createTextNode(vnode as any)

  const $el = document.createElement(vnode.type)

  for (const [ prop, val ] of entries(vnode.props))
    setProp($el, prop, val)

  for (const name of keys(vnode.props).filter(isEventProp))
    $el.addEventListener(toEventName(name), vnode.props[name], true)

  for (const $child of vnode.children.map(createElement))
    $el.appendChild.call($el, $child)

  return $el
}

/**
 * render
 */
function render ($el: HTMLElement, vnode: VNode) {
  let $node
  $el.firstChild && $el.removeChild($el.firstChild)
  return ($node = $el.insertBefore(createElement(vnode), $node))
}

export { VNode, h, render, classNames, isObject }
