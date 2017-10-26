// import *  from './constants'

export interface IAction {
  type: any
  [extraProps: string]: any
}

interface ITodo {
  id: string
  title: string
  completed: boolean
}

interface ITodoItemProps {
  key: string
  todo: ITodo
  editing?: boolean
  onSave: (val: any) => void
  onDestroy: () => void
  onEdit: () => void
  onCancel: (event: any) => void
  onToggle: () => void
}

interface ITodoItemState {
  editText: string
}

interface ITodoFooterProps {
  completedCount: number
  onClearCompleted: any
  nowShowing: string
  count: number
}

interface ITodoModel {
  key: any
  todos: ITodo[]
  on (onChange)
  inform ()
  addTodo (title: string)
  toggleAll (checked)
  toggle (todoToToggle)
  destroy (todo)
  save (todoToSave, text)
  clearCompleted ()
}

interface IAppProps {
  model: ITodoModel
}

interface IAppState {
  editing?: string
  nowShowing?: string
}
