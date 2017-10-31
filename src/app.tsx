// tslint:disable:jsx-no-lambda
import { classNames, createDispatcher, h, render as _render, Router } from "./dom"
import { ITodo, ITodoModel } from "./index.d"

const doc = document
const $app = doc.getElementById("app")
const { parse, stringify } = JSON

// Model --------------------------------------------------
class Todo {
  title: string
  completed: boolean
  id: string
  constructor ( title ) {
    this.id = Math.random().toString(36).substr(2, 10)
    this.title = title
    this.completed = false
  }
}

// let s, store = [].concat(
//   (s = window.localStorage.store) ? parse(s) : new Todo("VanillaDux")
// )

// VIEW ---------------------------------------------------
export const View = ({ fn, todos }) => {
  // Helpers & Components
  const itemsLeft = todos =>
    todos.reduce((sum, t) => (t.completed ? sum : sum + 1), 0)

  const LinkItem = p =>
    <li><a {...p}>{p.children}</a></li>

  const TodoItem = ({ id, editing, completed, title }) => (
    <li key={id} class={classNames({ completed, editing })}>
      <div class="view">
        <input class="toggle" type="checkbox" checked={completed} onChange={fn.completeTodo.bind(null, id)} />
        <label>{title}</label>
        <button class="destroy" onClick={fn.deleteTodo.bind(null, id)} />
      </div>
      <input class="edit" value={title} />
    </li>
  )

  return (
    <div class="app-container">
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input onkeypress={fn.onAddTodo} class="new-todo" autofocus={true} placeholder="What needs to be done?" />
        </header>
        <section class="main">
          <input id="toggle-all" class="toggle-all" type="checkbox" />
          <label for="toggle-all" onClick={fn.completeAll}>Mark all as complete</label>
          <ul class="todo-list">{todos.map(TodoItem)}</ul>
        </section>
        <footer class="footer">
          <span class="todo-count">
            <strong>{`${itemsLeft(todos)}`}</strong> item left
          </span>
          <ul class="filters">
            <LinkItem href="#/" class="selected">All</LinkItem>
            <LinkItem href="#/active">Active</LinkItem>
            <LinkItem href="#/completed">Completed</LinkItem>
          </ul>
          {itemsLeft(todos) && <button class="clear-completed" onClick={fn.clearCompleted}>Clear completed</button>}
        </footer>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="https://github.com/borestad">Johan Borestad</a></p>
        <p>Part of <a href="http://todomvcom">TodoMVC</a></p>
      </footer>
    </div>
  )
}

// Constants ----------------------------------------------
const
  ADD_TODO = "addTodo",
  COMPLETE_TODO = "completeTodo",
  DELETE_TODO = "deleteTodo",
  COMPLETE_ALL = "completeAll",
  CLEAR_COMPLETED = "clearCompleted",
  EDIT_TODO = "editTodo"

// Controller ---------------------------------------------
const dispatch = createDispatcher("action")
const notifyState = createDispatcher("state")
let model

export const Controller = () => {
  const todos = []
  const R = Router("/")

  let fn; return fn = {
    init: () => {
      model = new TodoModel()
      R.onChange(c.render)

      doc.addEventListener("state", fn.render)

      doc.addEventListener("action", (e: CustomEvent) => {
        reducers(model.store, e.detail)
      })

      notifyState()

    },
    onAddTodo: ({ keyCode, target }: KeyboardEvent) => {
      keyCode === 13 &&
        fn.addTodo((target as HTMLInputElement).value.trim())
    },
    addTodo: (title: string) => (
      title && dispatch({ type: ADD_TODO, title })
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
    render: () =>
      _render(doc.getElementById("app"),
        View({ fn, todos: model.todos }))
  }
}

class TodoModel {
  public todos: Array<ITodo>
  public onChanges: Array<any>
  public state: any

  constructor (store?) {
    let s
    this.todos = store || (s = localStorage.store) ? parse(s).todos : [new Todo("Hello world")]
  }

  save (newState) {
    this.todos = newState
    window.localStorage.store = stringify({
      todos: this.todos
    })
    notifyState()
    return this.todos
  }
  addTodo ({ title }) {
    return this.save([
      ...this.todos, new Todo(title)
    ])
  }
  deleteTodo ({ id }) {
    return this.save(
      this.todos.filter(todo => todo.id !== id)
    )
  }
  completeTodo ({ id }) {
    return this.save(
      this.todos.map(t => t.id === id ?
        { ...t, completed: !t.completed } : t)
    )
  }
  completeAll () {
    return this.save(
      this.todos.map(t => ({ ...t, completed: !this.todos.every(t => t.completed) }))
    )
  }
  clearCompleted () {
    return this.save(
      this.todos.map(t => ({ ...t, completed: !this.todos.every(t => t.completed) }))
    )
  }

}

function reducers (state = [], action) {
  return model[action.type](action)
}

const c = Controller()
c.init()

// ==============================================================
// Event listeners
// ==============================================================
