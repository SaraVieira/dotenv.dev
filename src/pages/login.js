import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import { compose, tokens } from 'classy-ui/macro'

import { useOvermind } from '../overmind/index.ts'

function Login() {
  const { actions, state } = useOvermind()

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate('/')
    }
  }, [state.isLoggedIn])

  return (
    <div
      className={compose(
        tokens.display.FLEX,
        tokens.alignItems.CENTER,
        tokens.justifyContent.CENTER,
        tokens.height.SCREEN,
        tokens.width.WIDTH_10_12,
        tokens.margin.AUTO
      )}
    >
      <button
        className={compose(
          tokens.backgroundColor.BLUE_400,
          tokens.color.WHITE,
          tokens.paddingHorizontal.SPACING_3,
          tokens.paddingVertical.SPACING_2,
          tokens.borderWidth.NONE,
          tokens.borderRadius.SMALL
        )}
        onClick={actions.loginWithTwitter}
        type="button"
      >
        Login With Twitter
      </button>
    </div>
  )
}

export default Login
