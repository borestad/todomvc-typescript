import { Controller as IController } from './app'
import { classNames, h } from './dom'

// Optimization for the compiler
// tslint:disable:jsx-wrap-multiline
// tslint:disable:jsx-key

// ========================================================
// VIEW
// ========================================================

interface IView {
  todos: any
  fn: IController
}

export const View = (props) => {
  const { fn, todos } = props
  const { addTodo, clearCompleted, completeAll, completeTodo, deleteTodo } = fn

  const onAddTodo = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      addTodo((e.target as HTMLInputElement).value.trim())
    }
  }

  const Container = () => (
    <div class='app-container'>
      <section class='todoapp'>
        <header class='header'>
          <h1>todos</h1>
          <input
            onkeypress={onAddTodo}
            class='new-todo'
            autofocus={true}
            placeholder='What needs to be done?'
          />
        </header>

        <section class='main'>
          <input id='toggle-all' class='toggle-all' type='checkbox' />
          <label for='toggle-all' onClick={completeAll} >Mark all as complete</label>
          <ul class='todo-list'>{todos.map(TodoItem)}</ul>
        </section>

        <footer class='footer'>
          <TodoCounter todos={todos} />
          {/* <!-- Remove this if you don't implement routing --> */}
          <ul class='filters'>
            <li>
              <a href='#/' class='selected'>
                All
              </a>
            </li>
            <li>
              <a href='#/active'>Active</a>
            </li>
            <li>
              <a href='#/completed'>Completed</a>
            </li>
          </ul>
          {/* <!-- Hidden if no completed items are left ↓ --> */}
          {true && <button class='clear-completed' onClick={clearCompleted}>Clear completed</button>}
        </footer>
      </section>

      <footer class='info'>
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href='https://github.com/borestad'>Johan Borestad</a>
        </p>
        <p>
          Part of <a href='http://todomvcom'>TodoMVC</a>
        </p>
      </footer>
    </div>
  )

  const TodoItem = ({ id, editing, completed, text, value }) => (
    <li key={id} class={classNames({ completed, editing })}>
      <div class='view'>
        <input
          class='toggle'
          type='checkbox'
          checked={completed}
          onChange={completeTodo.bind(null, id)}
        />
        <label>{text}</label>
        <button
          class='destroy'
          onClick={deleteTodo.bind(null, id)}
        />
      </div>
      <input class='edit' value={value} />
    </li>
  )

  const itemsLeft = todos =>
    todos.reduce((sum, { completed }) => (completed ? sum : sum + 1), 0)

  const TodoCounter = (props) => (
    <span class='todo-count'>
      <strong>{itemsLeft(props.todos)}</strong> item left
    </span>
  )

  return Container()
}
