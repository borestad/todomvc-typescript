import { classNames, h, render } from './dom'
const $app = document.getElementById('app')

enum Keys {
  ENTER = 13,
  ESCAPE = 27
}

const todos = Array.from({ length: 5 }).map((i, j) => ({
  completed: j % 2 === 0,
  editing: false,
  label: Math.random()
    .toString(36)
    .substring(7),
  value: 'Rule the web'
}))

const store = {
  todos: todos
}

const itemsLeft = todos =>
  todos.reduce((sum, { completed }) => (completed ? sum : sum + 1), 0)

const onclick = () => {
  alert('Hellooooo')
}
function addTodo (e: KeyboardEvent) {
  if (e.keyCode === Keys.ENTER) {
    console.log(this, 'ENTER: add Todo')
    // Remove the cursor from the input when you hit enter just like if it
    // were a real form
    // this.blur();
  }
}

const update = () => render($app, View({ todos: todos }))
const i = 0
document.getElementById('reload').addEventListener('click', update)

requestAnimationFrame(update)

// ======== VIEW ==========
//

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
