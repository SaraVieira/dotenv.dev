import { Derive } from 'overmind'

type User = {
  uid: string | null | undefined
  displayName: string | null | undefined
  photoURL: string | null | undefined
  username: string | null | undefined
}

export type Environment = {
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
  environments: Environment[]
  environment: {
    [id: string]: Environment
  }
}

export const state: State = {
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
