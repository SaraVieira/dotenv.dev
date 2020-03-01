import React from 'react'
import { compose, tokens } from 'classy-ui/macro'

import { useOvermind } from '../overmind/index.ts'

function Login() {
  const { actions } = useOvermind()

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
          tokens.paddingHorizontal.SPACING_03,
          tokens.paddingVertical.SPACING_02,
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
