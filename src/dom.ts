// tslint:disable:no-conditional-assignment
function isObject (val) {
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

function h (type: string | Function, props?: any, ...stack: any[]) {
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

function classNames (classNames?: string | Object, obj?: Object) {
  isObject(classNames) ? ([ obj, classNames ] = [ classNames, '' ]) : ([obj] = [{}])

  return (`${classNames} ` +
    Object.entries(obj)
      .filter(([ , val ]) => val && typeof val === 'boolean')
      .map(([className]) => className)
      .join(' ')
  ).trim()
}

const removeElement = ($el: HTMLElement) => {
  let c
  while ((c = $el.firstChild)) $el.removeChild(c)
}

function isEventProp (s: string) {
  return /^on/.test(s)
}

function setAttribute ($el: HTMLElement, name: string, value) {
  if (isEventProp(name)) return
  typeof value === 'boolean' && ($el[name] = value)
  $el.setAttribute(name, value)
}

function setProps ($el: HTMLElement, props: Object) {
  for (const [ name, val ] of Object.entries(props)) {
    setAttribute($el, name, val)
  }
}

function addEventListeners ($el: HTMLElement, props: Object) {
  for (const name of Object.keys(props).filter(isEventProp)) {
    $el.addEventListener(name.slice(2).toLowerCase(), props[name])
  }
}

function createElement (node: VNode | string): HTMLElement | Text {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }

  const $el = document.createElement(node.type)
  setProps($el, node.props)
  addEventListeners($el, node.props)
  node.children.map(createElement).forEach($el.appendChild.bind($el))
  return $el
}

function render ($target: HTMLElement, vnode: VNode) {
  let $el
  removeElement($target)
  return ($el = $target.insertBefore(createElement(vnode), $el))
}

export { h, render, classNames }
