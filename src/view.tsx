import { classNames, h } from './dom'

export const View = props => {
  const { fn, todos } = props

  // Helpers
  const itemsLeft = todos =>
    todos.reduce((sum, t) => (t.completed ? sum : sum + 1), 0)

  // Components
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

  // VIEW
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
