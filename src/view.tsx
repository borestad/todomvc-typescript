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
  Controller: IController
}

export const View = (props: IView) => {
  const { Controller, todos } = props
  const { onAddTodo, onClearCompleted, onCompleteAll, onCompleteTodo, onDeleteTodo, render } = Controller

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
          <label for='toggle-all'>Mark all as complete</label>
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
          {true && <button class='clear-completed' onClick={onClearCompleted}>Clear completed</button>}
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
          onChange={onCompleteTodo.bind(null, id)}
        />
        <label>{text}</label>
        <button
          class='destroy'
          onClick={onDeleteTodo.bind(null, id)}
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
