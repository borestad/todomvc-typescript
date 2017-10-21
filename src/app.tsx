import { h, updateElement } from './dom'
import { View, View2 } from './view'

const store = {
  todos: [
    {
      completed: true,
      label: 'Taste JavaScript',
      value: 'Create a TodoMVC template'
    },
    { completed: false, label: 'Buy a unicorn', value: 'Rule the web' },
    { completed: false, label: 'Buy a unicorn', value: 'Rule the web' }
  ]
}

const view = View({ store })
const view2 = View2({ store })
const view3 = h('div', null, 'hello')
const $app = document.getElementById('app')

let i = 0
document.getElementById('reload').addEventListener('click', () => {
  if (++i % 2 === 1) {
    updateElement($app, view2)
  } else {
    updateElement($app, view)
  }

  updateElement($app, h('div', null, 'hello'), view)
})

updateElement($app, view)

Array.from(document.querySelectorAll('label')).forEach(a => {
  a.innerHTML = a.innerHTML + '[foo]'
})
