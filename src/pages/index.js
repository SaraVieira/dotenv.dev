import React, { useEffect } from 'react'
import { Link } from '@reach/router'
import { compose, tokens } from 'classy-ui/macro'
import { useOvermind } from '../overmind/index.ts'
import Code from '../components/code'

const Index = () => {
  const { actions, state } = useOvermind()

  useEffect(() => {
    actions.getEnvironments()
  }, [])

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
        tokens.marginHorizontal.AUTO
      )}
    >
      {state.environments.map(env => (
        <Link key={env.id} to={`/environment/${env.id}`}>
          <Code code={JSON.stringify(env, null, 2)} />
        </Link>
      ))}
    </div>
  )
}

export default Index
