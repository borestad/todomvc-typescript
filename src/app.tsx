// tslint:disable:jsx-no-lambda
import { classNames, dispatch, h, loadState, render, Router } from './dom'
import { ITodo, ITodoModel } from './index.d'
import { View } from './view'
const doc = document
const $app = doc.getElementById('app')

let store = [
  ...(loadState() || [
    {
      // Default state
      text: 'Vanilladux',
      completed: false,
      id: 0
    }
  ])
]

// ==============================================================
// Model
// ==============================================================

// ==============================================================
// Constants
// ==============================================================

const ADD_TODO = 'ADD_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const COMPLETE_ALL = 'COMPLETE_ALL'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
const EDIT_TODO = 'EDIT_TODO'

// ========================================================
// Controller (~ Actions in Redux)
// ========================================================

export class Controller {
  // key: string
  todos: ITodo[]
  view

  constructor () {
    this.todos = []
    this.render = this.render.bind(this)

    doc.addEventListener('state', this.render)
  }

  addTodo (text: string) {
    return text.length && dispatch({ type: ADD_TODO, text })
  }

  completeTodo (id) {
    return dispatch({ type: COMPLETE_TODO, id })
  }

  deleteTodo (id) {
    return dispatch({ type: DELETE_TODO, id })
  }

  completeAll () {
    return dispatch({ type: COMPLETE_ALL })
  }

  clearCompleted () {
    return dispatch({ type: CLEAR_COMPLETED })
  }

  render () {
    render(doc.getElementById('app'),
      this.view = View({
        todos: store,
        fn: this
      }))
  }

  //   public toggleAll (checked: Boolean) {
  //       // Note: It's usually better to use immutable data structures since they're
  //       // easier to reason about and React works very well with them. That's why
  //       // we use map(), filter() and reduce() everywhere instead of mutating the
  //       // array or todo items themselves.
  //   this.todos = this.todos.map<ITodo>((todo: ITodo) => {
  //     return Utils.extend({}, todo, { completed: checked })
  //   })

  //   this.inform()
  // }

  //   public toggle (todoToToggle: ITodo) {
  //   this.todos = this.todos.map<ITodo>((todo: ITodo) => {
  //     return todo !== todoToToggle ?
  //           todo :
  //           Utils.extend({}, todo, { completed: !todo.completed })
  //   })

  //   this.inform()
  // }

  //   public destroy (todo: ITodo) {
  //   this.todos = this.todos.filter(function (candidate) {
  //     return candidate !== todo
  //   })

  //   this.inform()
  // }

  //   public save (todoToSave: ITodo, text: string) {
  //   this.todos = this.todos.map(function (todo) {
  //     return todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text })
  //   })

  //   this.inform()
  // }

  //   public clearCompleted () {
  //   this.todos = this.todos.filter(function (todo) {
  //     return !todo.completed
  //   })

  //   this.inform()
  // }
}

function todoReducer (state, action) {
  const eqfilter = t => t.id === action.id
  const { map, filter } = state

  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: ~~Math.max(...state.map(t => t.id)) + 1,
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(t => t.id !== action.id)

    case EDIT_TODO:
      return map(
        t => (t.id === action.id ? { ...t, text: action.text } : t)
      )

    case COMPLETE_TODO:
      return map(
        t => (t.id === action.id ? { ...t, completed: !t.completed } : t)
      )

    case COMPLETE_ALL:
      return map(t => ({
        ...t,
        completed: !state.every(t => t.completed)
      }))

    case CLEAR_COMPLETED:
      return filter(t => t.completed === false)

    default:
      return state
  }
}

const c = new Controller()
; (window as any).c = c

const R = Router('/')
R.onChange(path => {
  console.log('new path', path)
})

R.go('/completed')
// const router = new Router({
//   // cb: (path) => {
//   //   console.log('my cb', path)
//   //   c.render()
//   // }
// })

// ; (window as any).router = router

requestAnimationFrame(c.render)

// TODO: use store.dispatch
// http://redux.js.org/docs/api/Store.html#dispatch

const reducers = (state, action) =>
  todoReducer(state, action)

// ==============================================================
// Event listeners
// ==============================================================

doc.addEventListener(
  'action',
  (e: CustomEvent) => {
    store = reducers(store, e.detail)
    localStorage.store = JSON.stringify(store)
    doc.dispatchEvent(new CustomEvent('state'))
  },
  false
)
