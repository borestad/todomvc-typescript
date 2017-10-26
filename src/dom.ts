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
  return 'on' === ''.slice.call(v || '', 0, 2)
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
  ; (props = props || {}).children && (props.children = void 0)
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
export const classNames = (classNames?: string | KV, obj?: KV) => {
  isObject(classNames)
    ? ([ obj, classNames ] = [ classNames as KV, '' ])
    : ([obj] = [{}])

  return (`${classNames} ` +
    entries(obj).reduce(
      (name, [ k, v ]) => (v === true ? `${name} ${k}` : ''),
      ''
    )
  ).trim()
}

/**
 * setProp
 */
export function setProp ($el: Element, name: string, value) {
  if (isEventProp(name) || (name === 'class' && !value)) return
  if (typeof value === 'boolean') $el[name] = value
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

export const dispatch = fn =>
  doc.dispatchEvent(
    new CustomEvent('action', {
      detail: fn.call ? fn() : fn
    })
  )

export const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem('store')) as any
  } catch (e) {
    console.error(e)
  }
}

export function wrap (fn: Function): Function {
  return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
    if (target.call) {
      return ((...a) => _ =>
        fn.call(this, () => new target(a), a, target.name, 'class')
      ).call(this)
    } else {
      const Fn = descriptor.value
      descriptor.value = (...a) => (_ =>
        fn.call(this, () => Fn.apply(self, a), a, key, 'function')
      ).call(this)

      return descriptor
    }
  }
}

export const curry = (fn, ...args1) => (...args2) => fn(...args1, ...args2)
