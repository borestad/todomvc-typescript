// tslint:disable:jsx-no-lambda
import { classNames, dispatch, h, render as _render, Router } from './dom'
import { ITodo, ITodoModel } from './index.d'

const doc = document
const $app = doc.getElementById('app')
const { parse, stringify } = JSON

// Model --------------------------------------------------
class Todo {
  text: string
  completed: boolean
  id: string
  constructor ( text ) {
    this.id = Math.random().toString(36).substr(2, 10)
    this.text = text
    this.completed = false
  }
}

let s, store = [].concat(
  (s = window.localStorage.store) ? parse(s) : new Todo('VanillaDux')
)

// VIEW ---------------------------------------------------
export const View = props => {
  const { fn, todos } = props

  // Helpers & Components
  const itemsLeft = todos =>
    todos.reduce((sum, t) => (t.completed ? sum : sum + 1), 0)

  const LinkItem = p =>
    <li><a {...p}>{p.children}</a></li>

  const TodoItem = ({ id, editing, completed, text }) => (
    <li key={id} class={classNames({ completed, editing })}>
      <div class='view'>
        <input class='toggle' type='checkbox' checked={completed} onChange={fn.completeTodo.bind(null, id)} />
        <label>{text}</label>
        <button class='destroy' onClick={fn.deleteTodo.bind(null, id)} />
      </div>
      <input class='edit' value={text} />
    </li>
  )

  return (
    <div class='app-container'>
      <section class='todoapp'>
        <header class='header'>
          <h1>todos</h1>
          <input onkeypress={fn.onAddTodo} class='new-todo' autofocus={true} placeholder='What needs to be done?' />
        </header>
        <section class='main'>
          <input id='toggle-all' class='toggle-all' type='checkbox' />
          <label for='toggle-all' onClick={fn.completeAll}>Mark all as complete</label>
          <ul class='todo-list'>{todos.map(TodoItem)}</ul>
        </section>
        <footer class='footer'>
          <span class='todo-count'>
            <strong>{`${itemsLeft(todos)}`}</strong> item left
          </span>
          <ul class='filters'>
            <LinkItem href='#/' class='selected'>All</LinkItem>
            <LinkItem href='#/active'>Active</LinkItem>
            <LinkItem href='#/completed'>Completed</LinkItem>
          </ul>
          {itemsLeft(todos) && <button class='clear-completed' onClick={fn.clearCompleted}>Clear completed</button>}
        </footer>
      </section>
      <footer class='info'>
        <p>Double-click to edit a todo</p>
        <p>Created by <a href='https://github.com/borestad'>Johan Borestad</a></p>
        <p>Part of <a href='http://todomvcom'>TodoMVC</a></p>
      </footer>
    </div>
  )
}

// Constants ----------------------------------------------
const ADD_TODO = 'ADD_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const COMPLETE_ALL = 'COMPLETE_ALL'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
const EDIT_TODO = 'EDIT_TODO'

// Controller ---------------------------------------------
export const Controller = () => {
  const todos = []

  let fn; return fn = {
    init: () => {
      doc.addEventListener('state', fn.render)
      const R = Router('/')
      R.onChange(c.render)
      fn.render()
    },
    onAddTodo: ({ keyCode, target }: KeyboardEvent) => {
      keyCode === 13 &&
        fn.addTodo((target as HTMLInputElement).value.trim())
    },
    addTodo: (text: string) => (
      text && dispatch({ type: ADD_TODO, text })
    ),
    completeTodo: id => (
      dispatch({ type: COMPLETE_TODO, id })
    ),
    deleteTodo: id => (
      dispatch({ type: DELETE_TODO, id })
    ),
    completeAll: () => (
      dispatch({ type: COMPLETE_ALL })
    ),
    clearCompleted: () => (
      dispatch({ type: CLEAR_COMPLETED })
    ),
    render: () => (
      _render(doc.getElementById('app'),
        View({ fn, todos: store })
      )
    )
  }
}

function todoReducer (state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [ ...state, new Todo(action.text) ]

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
      return state.filter(t => !t.completed)

    default:
      return state
  }
}

const c = Controller()
c.init()

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
    window.localStorage.store = stringify(store)
    doc.dispatchEvent(new CustomEvent('state'))
  },
  false
)
