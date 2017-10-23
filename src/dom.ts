// tslint:disable:no-conditional-assignment
const { entries, keys } = Object
const { isArray } = Array

const isObject = v => v != null && typeof v === 'object' && !isArray(v)
const toEventName = (s: string) => s.slice(2).toLowerCase()

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
  VNode: true
}

function h (type: string | Function, props?: any, ...stack: any[]) {
  const children = []
  let c
  console.log(arguments.length)

  if (props != null && !isObject(props)) {
    props = void 0
    stack = [...arguments].slice(1)
  }

  (props = props || {}).children && delete props.children
  stack.length > 1 && stack.reverse()

  while (stack.length && (c = stack.pop())) {
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
    entries(obj)
      .filter(([ , val ]) => val && typeof val === 'boolean')
      .map(([className]) => className)
      .join(' ')
  ).trim()
}

const removeElement = ($el: HTMLElement) => {
  let c
  while ((c = $el.firstChild)) $el.removeChild(c)
}

function isEventProp (value?) {
  return /^on/.test(value)
}

function setProp ($el: HTMLElement, name: string, value) {
  if (isEventProp(name)) return
  if (name === 'class' && !value) return
  if (value === 'boolean') $el[name] = value
  $el.setAttribute(name, value)
}

function setProps ($el: HTMLElement, props: Object) {
  entries(props).forEach(([ p, v ]) => setProp($el, p, v))
}

function addEventListeners ($el: HTMLElement, props: Object) {
  const events = entries(props).filter(([k]) => isEventProp(k))

  for (const [ event, handler ] of events) {
    on(toEventName(event), $el)(handler)
  }
}

const on = (type: string, $el: HTMLElement) => (fn: EventListener) => {
  $el.addEventListener(type, fn, true)
  return () => $el.removeEventListener(type, fn, true)
}

function createElement (vnode: VNode | string): HTMLElement | Text {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  const $el = document.createElement(vnode.type)
  setProps($el, vnode.props)
  addEventListeners($el, vnode.props)
  vnode.children.map(createElement).forEach($el.appendChild.bind($el))
  return $el
}

function render ($target: HTMLElement, vnode: VNode) {
  let $el
  removeElement($target)
  return ($el = $target.insertBefore(createElement(vnode), $el))
}

(window as any).h = h
export { VNode, h, render, classNames }
