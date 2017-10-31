// import { Controller as IController } from './app'
import { classNames, h } from './dom'

// Optimization for the compiler
// tslint:disable:jsx-wrap-multiline
// tslint:disable:jsx-key

// ========================================================
// VIEW
// ========================================================

// interface IView {
//   todos: any
//   fn: IController
// }

export const View = (p) => {
  const { fn, todos } = p

  const onAddTodo = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      fn.addTodo((e.target as HTMLInputElement).value.trim())
    }
  }

  const Container = () => (
    <div class='app-container'>
      <section class='todoapp'>
        <header class='header'>
          <h1>todos</h1>
          <input onkeypress={onAddTodo} class='new-todo' autofocus={true} placeholder='What needs to be done?' />
        </header>
        <section class='main'>
          <input id='toggle-all' class='toggle-all' type='checkbox' />
          <label for='toggle-all' onClick={fn.completeAll}>Mark all as complete</label>
          <ul class='todo-list'>{todos.map(TodoItem)}</ul>
        </section>
        <footer class='footer'>
          <span class='todo-count'>
            <strong>{`${itemsLeft}`}</strong> item left
          </span>
          <ul class='filters'>
            <LinkItem href='#/' class='selected'>All</LinkItem>
            <LinkItem href='#/active'>Active</LinkItem>
            <LinkItem href='#/completed'>Completed</LinkItem>
          </ul>
          {itemsLeft && <button class='clear-completed' onClick={fn.clearCompleted}>Clear completed</button>}
        </footer>
      </section>
      <footer class='info'>
        <p>Double-click to edit a todo</p>
        <p>Created by <a href='https://github.com/borestad'>Johan Borestad</a></p>
        <p>Part of <a href='http://todomvcom'>TodoMVC</a></p>
      </footer>
    </div>
  )

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

  const itemsLeft =
    todos.reduce((sum, t) => (t.completed ? sum : sum + 1), 0)

  const LinkItem = p =>
    <li><a {...p}>{p.children}</a></li>

  return Container()
}
