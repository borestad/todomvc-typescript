// tslint:disable:no-empty
import { View } from '../app'

const $$ = (context: HTMLElement) => (selector: string) =>
  context.querySelectorAll(selector)

describe('View', () => {
  test('should render', () => {

  })
  // test('should render', () => {
  //   const html: HTMLElement = document.createElement('myapp')
  //   const store = {
  //     counter: 0
  //   }
  //   html.appendChild(View({ store }))

  //   const $ = $$(html)

  //   // Overall structure
  //   expect($('section.todoapp + footer.info')).toHaveLength(1)

  //   // Root section
  //   expect($('section.todoapp').length).toBe(1)
  //   expect($('section.todoapp header h1').item(0).innerHTML).toBe('todos')
  //   expect($('section.todoapp section.main')).toHaveLength(1)

  //   // Toggles
  //   expect($('section.main span input.toggle-all').length).toBe(1)

  //   // List items
  //   expect($('ul.todo-list')).toHaveLength(1)
  //   expect($('ul.todo-list li')).toHaveLength(2)

  //   // FooterInfo
  //   expect($('footer.info')).toHaveLength(1)
  //   expect($('footer.info p')).toHaveLength(3)
  //   expect($('footer.info p:first-child').item(0).innerHTML).toBe(
  //     'Double-click to edit a todo'
  //   )

  //   // Make sure child components are rendered in the right order
  //   expect($('.toggle-all + label')).toHaveLength(1)

  // })
})
