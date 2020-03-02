import React, { useEffect } from 'react'
import { compose, tokens } from 'classy-ui/macro'
import { useOvermind } from '../overmind/index.ts'
import Code from '../components/code'
import Loading from '../components/loading'

const Environment = ({ id }) => {
  const { actions, state } = useOvermind()
  useEffect(() => {
    actions.getEnvironment(id)
  }, [])

  if (state.isLoadingEnvironment || !state.environment[id]) {
    return <Loading />
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
          <div
            className={compose(
              tokens.display.GRID,
              tokens.gridTemplateColumns.COLUMNS_2,
              tokens.gap.SPACING_4
            )}
          >
            <img
              src={env.editor.screenshot}
              width="100%"
              alt={env.editor.type}
            />
            <div>
              Editor:
              {env.editor.type}
              <h2>Settings</h2>
              <Code code={env.editor.config} />
            </div>
          </div>
        </>
      )}
      {env.terminal && (
        <>
          <div
            className={compose(
              tokens.display.GRID,
              tokens.gridTemplateColumns.COLUMNS_2,
              tokens.gap.SPACING_4
            )}
          >
            <img
              src={env.terminal.screenshot}
              width="100%"
              alt={env.terminal.type}
            />
            <div>
              Terminal:
              {env.terminal.type}
              <h2>Settings</h2>
              <Code code={env.terminal.config} />
            </div>
          </div>
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
