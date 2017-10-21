// tslint:disable:no-conditional-assignment
// import { isEventProp } from './utils'
type EL = HTMLElement
type Obj = {[key: string]: any}

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

// ==============================================
// createNode
// ==============================================
export const entityMap = {
  '&': 'amp',
  '<': 'lt',
  '>': 'gt',
  '"': 'quot',
  '\'': '#39',
  '/': '#x2F'
}

// TODO: Does this work?
// new RegExp(Object.keys(entityMap))
export const escapeHtml = str =>
  String(str).replace(/[&<>"'\/\\]/g, s => `&${entityMap[s]};`)

export const renderVNode = ($target: EL, vnode: VNode) => {
  let $el
  removeElement($target)
  return ($el = $target.insertBefore(createElement(vnode), $el))
}

export const updateElement = renderVNode
// ==============================================
// HOC & HELPERS
// ==============================================

export const negate = fn => (...x) => !fn(...x)

export const eachPair = (obj, fn) =>
  Object.entries(obj).forEach(([ key, val ]) => fn(key, val))

export const curry = (fn, ...args1) => (...args2) => fn(...args1, ...args2)

export const isEventProp = s => /^on/.test(s)

// ==============================================
// DOM HELPERS
// ==============================================

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

const removeElement = ($el: EL) => {
  let c
  while ((c = $el.firstChild)) {
    $el.removeChild(c)
  }
}

export const extractEventName = (s: string) => s.slice(2).toLowerCase()

export const isCustomProp = name => {
  return isEventProp(name) || name === 'forceUpdate'
}

export function setProp ($el: EL, name, value) {
  typeof value === 'boolean' && ($el[name] = value)
  $el.setAttribute(name, value)
}

export function removeProp ($el: EL, name, oldprop?) {
  $el[name] = false
  $el.removeAttribute(name)
}

// export function setProps ($el: EL, props) {
//   eachPair(props, curry(setProp, $el))
// }

export const setProps = ($el, props) => {
  for (const [ name, val ] of Object.entries(props)) {
    setProp($el, name, val)
  }
}

export const addEventListeners = ($el: EL, props) => {
  // Object.keys(props)
  //   .filter(isEventProp)
  //   .map(name => [ extractEventName(name), props[name] ])
  //   .forEach($el.addEventListener.bind($el))

  for (const name of Object.keys(props).filter(isEventProp)) {
    $el.addEventListener(extractEventName(name), props[name])
  }

  // Object.keys(props)
  //   .filter(negate(isEventProp))
  //   .map(extractEventName)
  //   .forEach(name => $el.addEventListener())
}
// ; (window as any).toVNode = toVNode
; (window as any).h = h
; (window as any).render = renderVNode
