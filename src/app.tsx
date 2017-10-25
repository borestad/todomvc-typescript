import { classNames, h, render } from './dom'
const $app = document.getElementById('app')

const initialState = [{
  text: 'Vanilladux',
  completed: false,
  id: 0
}]

let store = [...initialState]

// TODO: use store.dispatch
// http://redux.js.org/docs/api/Store.html#dispatch
const dispatch = (fn) =>
  document.dispatchEvent(new CustomEvent('action', {
    detail: fn
  }))

const reducers = (state, action) =>
  todoReducer(state, action)

document.addEventListener('action', function (e) {
  console.log('action happened', e)
  store = reducers(store, (e as any).detail)
  console.log(store)
  document.dispatchEvent(new CustomEvent('state'))
}, false)

enum Keys {
  ENTER = 13,
  ESCAPE = 27
}
// ==============================================================
const todos2 = Array.from({ length: 5 }).map((i, j) => ({
  completed: j % 2 === 0,
  editing: false,
  label: Math.random()
    .toString(36)
    .substring(7),
  value: 'Rule the web'
}))

const store2 = {
  todos: todos2
}

// Controller
// ==============================================================
const onclick = () => {
  alert('Hellooooo')
}

function addTodo (e: KeyboardEvent) {
  if (e.keyCode === Keys.ENTER) {
    const text = (e.target as HTMLInputElement).value.trim()
    dispatch(Actions.addTodo(text))
  }
}

const update = () => render($app, View({ todos: store }))
document.addEventListener('state', (e) => update())
const i = 0
document.getElementById('reload').addEventListener('click', update)

requestAnimationFrame(update)

// ========================================================
// Actions
// ========================================================
export const Actions = {
  addTodo: text => ({ type: 'ADD_TODO', text }),
  deleteTodo: id => ({ type: 'DELETE_TODO', id }),
  editTodo: (id, text) => ({ type: 'EDIT_TODO', id, text }),
  completeTodo: id => ({ type: 'COMPLETE_TODO', id }),
  completeAll: () => ({ type: 'COMPLETE_ALL' }),
  clearCompleted: () => ({ type: 'CLEAR_COMPLETED' })
}

// ========================================================
// Reducer
// ========================================================
function todoReducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    case 'DELETE_TODO':
      return state.filter(todo =>
        todo.id !== action.id
      )

    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case 'COMPLETE_TODO':
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case 'COMPLETE_ALL':
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case 'CLEAR_COMPLETED':
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
// ========================================================
// VIEW
// ========================================================
const itemsLeft = todos =>
  todos.reduce((sum, { completed }) => (completed ? sum : sum + 1), 0)

const View = ({ todos }) => (
  <div class='app-container'>
    <section class='todoapp'>
      <header class='header'>
        <h1>todos</h1>
        <input onkeypress={addTodo} class='new-todo' autofocus={true} placeholder='What needs to be done?' />
      </header>

      <section class='main'>
        <input id='toggle-all' class='toggle-all' type='checkbox' />
        <label for='toggle-all'>Mark all as complete</label>
        <ul class='todo-list'>{todos.map(TodoItem)}</ul>
      </section>

      <footer class='footer'>
        <TodoCounter todos={todos}/>
        {/* <!-- Remove this if you don't implement routing --> */}
        <ul class='filters'>
          <li><a href='#/' class='selected'>All</a></li>
          <li><a href='#/active'>Active</a></li>
          <li><a href='#/completed'>Completed</a></li>
        </ul>
        {/* <!-- Hidden if no completed items are left ↓ --> */}
        {false && <button class='clear-completed'>Clear completed</button>}
      </footer>
    </section>

    <FooterInfo />
  </div>
)

const TodoItem = ({ editing, completed, text, value }) => (
  <li class={classNames({ completed, editing })}>
    <div class='view'>
      <input class='toggle' type='checkbox' checked />
      <label>{text}</label>
      <button class='destroy' />
    </div>
    <input class='edit' value={value} />
  </li>
)

const TodoCounter = ({ todos }) => (
  <span class='todo-count'>
    <strong>{itemsLeft(todos)}</strong> item left
  </span>

)
const FooterInfo = () => (
  <footer class='info'>
  <p>Double-click to edit a todo</p>
  <p>Created by <a href='https://github.com/borestad'>Johan Borestad</a></p>
  <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>
</footer>
)
