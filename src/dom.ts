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

const isEventProp = s => /^on/.test(s)

const extractEventName = (s: string) => s.slice(2).toLowerCase()

export const isCustomProp = name => {
  return isEventProp(name) || name === 'forceUpdate'
}

export const setProp = ($el, name, value) => {
  if (isCustomProp(name)) {
    return
  } else if (name === 'className') {
    $el.setAttribute('class', value)
  } else if (typeof value === 'boolean') {
    $el[name] = value
    value && $el.setAttribute(name, value)
  } else {
    $el.setAttribute(name, value)
  }
}

export const removeProp = ($el, name, value) => {
  if (isCustomProp(name)) return
  if (name === 'className') name = 'class'

  $el[name] = false
  $el.removeAttribute(name)
}

export const setProps = ($el, props) => {
  for (const [ name, val ] of Object.entries(props)) {
    setProp($el, name, val)
  }
}

export const updateProp = ($el, name, newVal, oldVal) => {
  if (!newVal) {
    removeProp($el, name, oldVal)
  } else if (!oldVal || newVal !== oldVal) {
    setProp($el, name, newVal)
  }
}

export const updateProps = ($el: HTMLElement, newProps, oldProps) => {
  for (const name of Object.keys({ ...newProps, ...oldProps })) {
    updateProp($el, name, newProps[name], oldProps[name])
  }
}

export const addEventListeners = ($el, props) => {
  for (const name of Object.keys(props).filter(isEventProp)) {
    $el.addEventListener(extractEventName(name), props[name])
  }
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

export const updateElement = (
  $root: HTMLElement,
  vnode?: VNode,
  oldVnode?: VNode,
  index = 0
) => {
  let $el
  const $node = $root.childNodes[index] as HTMLElement

  if (!oldVnode && vnode) {
    removeElement($root)
    $el = $root.insertBefore(createElement(vnode), $el)
  }
  //  else if (!vnode) {
  //   $root.removeChild($node)
  // } else if (hasNodeChanged(vnode, oldVnode)) {
  //   $root.replaceChild(createElement(vnode), $node)
  // } else if (vnode.type) {
  //   updateProps($node, vnode.props, oldVnode.props)
  //   const len = Math.min(vnode.children.length, oldVnode.children.length)

  //   for (let i = 0; i < len; i++)
  //     updateElement($node, vnode.children[i], oldVnode.children[i], i)
  // }
}
