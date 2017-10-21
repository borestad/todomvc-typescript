// tslint:disable:no-conditional-assignment
type EL = HTMLElement

export function isObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

// ==============================================
// VDOM HELPERS
// ==============================================
export class VNode {
  type: string
  props: object
  children: any[]

  constructor (type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

export function h (type: string | Function, props?: any, ...stack: any[]) {
  const children = []
  let c

  props = props || {}
  props.children && delete props.children
  stack.length > 1 && stack.reverse()

  while (stack.length) {
    if ((c = stack.pop()))
      if (c.pop) stack.push(...(c.length > 1 ? c.reverse() : c))
      else if (true !== c) children.push(c.toFixed ? '' + c : c)
  }

  return (type as Function).call
    ? (type as Function)(props, (props.children = children))
    : new VNode(type, props, children)
}

export function classNames (classNames?: string | Object, obj?: Object) {
  isObject(classNames) ? ([ obj, classNames ] = [ classNames, '' ]) : ([obj] = [{}])

  return (`${classNames} ` +
    Object.entries(obj)
      .filter(([ , val ]) => val && typeof val === 'boolean')
      .map(([className]) => className)
      .join(' ')
  ).trim()
}

const removeElement = ($el: EL) => {
  let c
  while ((c = $el.firstChild)) {
    $el.removeChild(c)
  }
}

export const negate = fn => (...x) => !fn(...x)

export const eachPair = (obj, fn) =>
  Object.entries(obj).forEach(([ key, val ]) => fn(key, val))

export const curry = (fn, ...args1) => (...args2) => fn(...args1, ...args2)

const isEventProp = s => /^on/.test(s)

const extractEventName = (s: string) => s.slice(2).toLowerCase()

export const isCustomProp = name => {
  return isEventProp(name) || name === 'forceUpdate'
}

export const setProp = ($el: EL, name, value) => {
  if (isEventProp(name)) return
  typeof value === 'boolean' && ($el[name] = value)
  $el.setAttribute(name, value)
}

export const removeProp = ($el, name, value) => {
  if (isEventProp(name)) return

  $el[name] = false
  $el.removeAttribute(name)
}

export function setProps ($el: EL, props) {
  eachPair(props, curry(setProp, $el))
}

export const addEventListeners = ($el, props) => {
  Object.entries(props)
    .filter(isEventProp)
    .forEach(([ name, prop ]) => {
      $el.addEventListener(extractEventName(name), prop)
    })
}

export const createElement = (node: VNode | string): HTMLElement | Text => {
  if (typeof node === 'string') {
    return document.createTextNode(node as string)
  }

  const { type, children, props } = node as VNode
  const $el: HTMLElement = document.createElement(type)

  setProps($el, props)
  addEventListeners($el, props)
  children.map(createElement).forEach($el.appendChild.bind($el))
  return $el
}

export const render = (element: VNode, container: HTMLElement, callback?) => {
  updateElement(container, element)
}

export const updateElement = ($target: EL, vnode: VNode) => {
  let $el
  removeElement($target)
  return ($el = $target.insertBefore(createElement(vnode), $el))
}
