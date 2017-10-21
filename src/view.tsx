import {
  AppContainer,
  Footer,
  Header,
  Main,
  TodoApp,
  TodoCounter
} from './components'

import { h } from './dom'

export const View = ({ store }) => (
  <AppContainer>
    <TodoApp>
      <Header />
      <Main todos={store.todos} />
      <TodoCounter todos={store.todos} />
    </TodoApp>
    <Footer />
  </AppContainer>
)

export const View2 = ({ store }) => (
  <AppContainer>
    <TodoApp>
      <Header />
      <Main todos={store.todos} />
    </TodoApp>
  </AppContainer>
)
