// tslint:disable:no-conditional-assignment
type KV = { [key: string]: any }

const { entries, keys } = Object
const { isArray } = Array

const isObject = v => v != null && typeof v === 'object' && !isArray(v)
const toEventName = (s: string) => s.slice(2).toLowerCase()
const eachPair = (obj: object, fn: Function) =>
  entries(obj).forEach(([ key, val ]) => fn(key, val))

// ==============================================
// VDOM HELPERS
// ==============================================
class VNode {
  type: string
  props: object
  children: any[]

  constructor (type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

function h (type: string | Function, props?: any, ...children: any[]) {
  const stack = []
  let c

  delete (props = props || {}).children
  children.length > 1 && children.reverse()

  while (children.length && (c = children.pop())) {
    if (c.pop) children.push(...(c.length > 1 ? c.reverse() : c))
    else if (true !== c) stack.push(c.toFixed ? '' + c : c)
  }

  return (type as Function).call
    ? (type as Function)(props, (props.children = stack))
    : new VNode(type, props, stack)
}

function classNames (classNames?: string | KV, obj?: KV) {
  isObject(classNames) ?
    [ obj, classNames ] = [ classNames as KV, '' ] :
    [obj] = [{}]

  return (`${classNames} ` +
    entries(obj)
      .filter(p => true === p[1])
      .map(p => p[0])
      .join(' ')
  ).trim()
}

function isEventProp (value?) {
  return /^on/.test(value)
}

function setProp ($el: Element, name: string, value) {
  if (isEventProp(name) || (name === 'class' && !value)) return
  if (typeof value === 'boolean') $el[name] = value
  $el.setAttribute(name, value)
}

function createElement (vnode: VNode | string): Element | Text {
  if (typeof vnode === 'string')
    return document.createTextNode(vnode)

  const $el = document.createElement(vnode.type)

  for (const [ prop, val ] of entries(vnode.props))
    setProp($el, prop, val)

  for (const name of keys(vnode.props).filter(isEventProp))
    $el.addEventListener(toEventName(name), vnode.props[name], true)

  for (const $child of vnode.children.map(createElement))
    $el.appendChild.call($el, $child)

  return $el
}

function render ($el: HTMLElement, vnode: VNode) {
  let $node
  $el.firstChild && $el.removeChild($el.firstChild)
  return ($node = $el.insertBefore(createElement(vnode), $node))
}

(window as any).h = h
export { VNode, h, render, classNames, isObject }
