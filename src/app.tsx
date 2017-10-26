// tslint:disable:jsx-no-lambda
import { classNames, dispatch, h, loadState, render, wrap } from './dom'
import { ITodo, ITodoModel } from './index.d'
import { View } from './view'
const doc = document
const $app = doc.getElementById('app')

const log = (callback, args, name, type) => {
  console.log('Starting  ', type, name)
  const result = callback()
  console.log('Ended: ', name)
  return result
}

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

const update = () =>
  render(
    doc.getElementById('app'),
    View({ todos: store, Controller: (new Controller()) })
  )

requestAnimationFrame(update)

// TODO: use store.dispatch
// http://redux.js.org/docs/api/Store.html#dispatch

const reducers = (state, action) => todoReducer(state, action)

// ==============================================================
// Event listeners
// ==============================================================

doc.addEventListener('state', update)

doc.addEventListener(
  'action',
  e => {
    store = reducers(store, (e as any).detail)
    localStorage.store = JSON.stringify(store)
    doc.dispatchEvent(new CustomEvent('state'))
  },
  false
)

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

// ==============================================================
// Actions
// ==============================================================

// ========================================================
// Controller (~ Actions in Redux)
// ========================================================
const Actions = {
  addTodo: text => ({ type: ADD_TODO, text }),
  completeTodo: id => ({ type: COMPLETE_TODO, id }),
  deleteTodo: id => ({ type: DELETE_TODO, id }),
  completeAll: () => ({ type: COMPLETE_ALL }),
  clearCompleted: () => ({ type: CLEAR_COMPLETED })
}

@wrap(log)
export class Controller {
  // key: string
  todos: ITodo[]

  constructor () {
    // this.namespace = namespace
    this.todos = []
    // this.view = null
  }

  @wrap(log)
  onAddTodo (e: KeyboardEvent) {
    return (e) => {
      if (e.keyCode === 13) {
        const text = (e.target as HTMLInputElement).value.trim()
        text.length && dispatch(Actions.addTodo(text))
      }
    }
  }
  onCompleteTodo (id) {
    dispatch(Actions.completeTodo(id))
  }
  onDeleteTodo (id) {
    dispatch(Actions.deleteTodo(id))
  }

  onCompleteAll () {
    dispatch(Actions.completeAll())
  }

  onClearCompleted () {
    dispatch(Actions.clearCompleted())
  }

  // public subscribe (onChange) {
  //   this.onChanges.push(onChange)
  // }

  // public inform () {
  //   Utils.store(this.key, this.todos)
  //   this.onChanges.forEach(function (cb) { cb() })
  // }
  render () {}

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
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: Math.max(...state.map(t => t.id)) + 1,
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(t => t.id !== action.id)

    case EDIT_TODO:
      return state.map(
        t => (t.id === action.id ? { ...t, text: action.text } : t)
      )

    case COMPLETE_TODO:
      return state.map(
        t => (t.id === action.id ? { ...t, completed: !t.completed } : t)
      )

    case COMPLETE_ALL:
      return state.map(t => ({
        ...t,
        completed: !state.every(t => t.completed)
      }))

    case CLEAR_COMPLETED:
      return state.filter(t => t.completed === false)

    default:
      return state
  }
}
