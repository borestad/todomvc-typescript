import { classNames, h } from './dom'

// tslint:disable:jsx-wrap-multiline
// tslint:disable:jsx-key

const itemsLeft = todos =>
  todos.reduce((sum, { completed }) => (completed ? sum : sum + 1), 0)

// This footer should hidden by default and shown when there are todos

const TodoItem = ({ editing, completed, label, value }) => (
  <li class={classNames({ completed, editing })}>
    <div class='view'>
      <input class='toggle' type='checkbox' checked />
      <label>{label}</label>
      <button class='destroy' />
    </div>
    <input class='edit' value={value} />
  </li>
)

// ============================================================================
// Static Components
// ============================================================================

const onclick = () => {
  alert('Hellooooo')
}

export const View = ({ todos }) => (
  <div class='app-container'>
    <section class='todoapp'>
      <header class='header' onClick={onclick}>
        <h1>todos</h1>
        <input class='new-todo' autofocus={true} placeholder='What needs to be done?' />
      </header>

      <section class='main'>
        <input id='toggle-all' class='toggle-all' type='checkbox' />
        <label for='toggle-all'>Mark all as complete</label>
        <ul class='todo-list'>{todos.map(TodoItem)}</ul>
      </section>

      <footer class='footer'>
        <span class='todo-count'>
          <strong v-itemsleft>{itemsLeft(todos)}</strong> item left
        </span>
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

    <footer class='info'>
      <p>Double-click to edit a todo</p>
      <p>Created by <a href='https://github.com/borestad'>Johan Borestad</a></p>
      <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>
    </footer>
  </div>
)
