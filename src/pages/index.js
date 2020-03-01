import React from 'react'
import { Link } from '@reach/router'
import { compose, tokens } from 'classy-ui/macro'
import { useOvermind } from '../overmind/index.ts'
// import Code from '../components/code'

const Index = () => {
  const { state } = useOvermind()

  if (state.isLoadingEnvironments) {
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
  return (
    <div
      className={compose(
        tokens.marginVertical.SPACING_12,
        tokens.width.WIDTH_10_12,
        tokens.marginHorizontal.AUTO,
        tokens.display.GRID,
        tokens.gridTemplateColumns.COLUMNS_3,
        tokens.gap.SPACING_2
      )}
    >
      {state.environments.map(env => (
        <Link key={env.id} to={`/environment/${env.id}`}>
          <div className={compose(tokens.maxWidth.FULL)}>
            <img
              className={compose(tokens.maxWidth.FULL)}
              src={env.editor.screenshot}
              alt={env.editor.type}
            />
            <img
              className={compose(tokens.maxWidth.FULL)}
              src={env.terminal.screenshot}
              alt={env.terminal.type}
            />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Index
