import React, { useEffect } from 'react'
import { compose, tokens } from 'classy-ui/macro'
import { useOvermind } from '../overmind/index.ts'
import Code from '../components/code'

const Environment = ({ id }) => {
  const { actions, state } = useOvermind()
  useEffect(() => {
    actions.getEnvironment(id)
  }, [])

  if (state.isLoadingEnvironment || !state.environment[id]) {
    return (
      <div
        className={compose(
          tokens.marginVertical.SPACING_12,
          tokens.width.WIDTH_10_12,
          tokens.marginHorizontal.AUTO
        )}
      >
        Loading
      </div>
    )
  }
  const env = state.environment[id]

  return (
    <div
      className={compose(
        tokens.marginVertical.SPACING_12,
        tokens.width.WIDTH_10_12,
        tokens.marginHorizontal.AUTO
      )}
    >
      {env.editor && (
        <>
          <h1>Editor Config</h1>
          Editor:
          {env.editor.type}
          <h2>Screenshot</h2>
          <img src={env.editor.screenshot} width="100%" alt={env.editor.type} />
          <h2>Settings</h2>
          <Code code={env.editor.config} />
        </>
      )}
      {env.terminal && (
        <>
          <h1>Terminal Config</h1>
          Terminal:
          {env.terminal.type}
          <h2>Screenshot</h2>
          <img
            src={env.terminal.screenshot}
            width="100%"
            alt={env.terminal.type}
          />
          <h2>Settings</h2>
          <Code code={env.terminal.config} />
        </>
      )}
      {env.extra && (
        <>
          <h2>Extra Remarks</h2>
          <p>{env.extra}</p>
        </>
      )}
    </div>
  )
}

export default Environment
