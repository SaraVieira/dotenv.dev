import { Derive } from 'overmind'

export type User = {
  uid: string | null | undefined
  displayName: string | null | undefined
  photoURL: string | null | undefined
  username: string | null | undefined
}

export type Environment = {
  user: User
  id: string
  editor: {
    config: string
    screenshot: string
    type: string
  }
  extra: string
  terminal: {
    config: string
    screenshot: string
    type: string
  }
}

type State = {
  user: User | null
  isLoggedIn: Derive<State, boolean>
  editors: String[]
  terminals: String[]
  isCreating: boolean
  isLoadingEnvironment: boolean
  isLoadingEnvironments: boolean
  createdId: string
  environments: Environment[]
  environment: {
    [id: string]: Environment
  }
  theme: 'dark' | 'light' | 'all'
}

export const state: State = {
  theme: 'all',
  createdId: null,
  environments: [],
  isLoadingEnvironments: false,
  user: null,
  isLoadingEnvironment: false,
  isCreating: false,
  isLoggedIn: ({ user }) => {
    return !!user
  },
  environment: {},
  editors: ['VSCode', 'Atom', 'Vim', 'Sublime Text'],
  terminals: ['Iterm', 'Hyper', 'Windows Terminal']
}
