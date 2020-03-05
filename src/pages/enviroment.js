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
      <div
        className={compose(
          tokens.display.FLEX,
          tokens.marginVertical.SPACING_4
        )}
      >
        <img
          className={compose(
            tokens.borderRadius.FULL,
            tokens.marginRight.SPACING_4,
            tokens.marginBottom.SPACING_8
          )}
          src={env.user.photoURL}
          alt={env.user.displayName}
          style={{
            width: 40,
            height: 40
          }}
        />
        <div>
          <span className={compose(tokens.display.BLOCK)}>
            {env.user.displayName}
          </span>
          <a href={`https://twitter.com/${env.user.username}`}>
            @{env.user.username}
          </a>
        </div>
      </div>
      <h2>{env.editor.type}</h2>
      {env.editor && (
        <>
          <div
            className={compose(
              tokens.display.GRID,
              tokens.gridTemplateColumns.COLUMNS_2,
              tokens.gap.SPACING_4
            )}
          >
            <section>
              <h3>ScreenShot</h3>
              <img
                src={env.editor.screenshot}
                width="100%"
                alt={env.editor.type}
              />
            </section>
            <section>
              <h3>Settings</h3>
              <Code code={env.editor.config} />
            </section>
          </div>
        </>
      )}
      <h2>{env.terminal.type}</h2>
      {env.terminal && (
        <>
          <div
            className={compose(
              tokens.display.GRID,
              tokens.gridTemplateColumns.COLUMNS_2,
              tokens.gap.SPACING_4
            )}
          >
            <div>
              <h3>ScreenShot</h3>
              <img
                src={env.terminal.screenshot}
                width="100%"
                alt={env.terminal.type}
              />
            </div>
            <div>
              <h3>Settings</h3>
              <Code code={env.terminal.config} />
            </div>
          </div>
        </>
      )}
      {env.extra && (
        <>
          <h3>Extra Remarks</h3>
          <p>{env.extra}</p>
        </>
      )}
    </div>
  )
}

export default Environment
