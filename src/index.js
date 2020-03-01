import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { Router } from '@reach/router'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import Index from './pages/index'
import Create from './pages/create'
import Environment from './pages/enviroment'
import Login from './pages/login'
import * as serviceWorker from './serviceWorker'
import { config } from './overmind/index.ts'
import 'typeface-inter'

const overmind = createOvermind(config)

ReactDOM.render(
  <Provider value={overmind}>
    <>
      {/* <nav>Hello</nav> */}
      <Router>
        <Index path="/" />
        <Create path="/create" />
        <Login path="/login" />
        <Environment path="/environment/:id" />
      </Router>
    </>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
