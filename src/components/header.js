import React from 'react'
import { compose, tokens } from 'classy-ui/macro'
import { Link } from '@reach/router'
import Logo from './logo'
import { useOvermind } from '../overmind/index.ts'

const Header = () => {
  const { actions, state } = useOvermind()
  return (
    <nav
      className={compose(
        tokens.display.FLEX,
        tokens.justifyContent.BETWEEN,
        tokens.padding.SPACING_5,
        tokens.marginBottom.SPACING_16
      )}
    >
      <Logo />
      {!state.isLoggedIn ? (
        <button
          className={compose(
            tokens.cursor.POINTER,
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
      ) : (
        <div className={compose(tokens.display.FLEX, tokens.alignItems.CENTER)}>
          <Link
            to="/create"
            className={compose(
              tokens.cursor.POINTER,
              tokens.backgroundColor.BLUE_400,
              tokens.color.WHITE,
              tokens.paddingHorizontal.SPACING_3,
              tokens.paddingVertical.SPACING_2,
              tokens.borderWidth.NONE,
              tokens.borderRadius.SMALL,
              tokens.marginRight.SPACING_3,
              tokens.textDecorationLine.NONE
            )}
            style={{ height: 40, lineHeight: '24px', width: 200 }}
          >
            Post your environment
          </Link>
          <img
            height="40px"
            className={compose(
              tokens.borderRadius.SMALL,
              tokens.borderColor.GRAY_300,
              tokens.borderWidth.WIDTH_2,
              tokens.borderStyle.SOLID
            )}
            src={state.user.photoURL}
            alt={state.user.username}
          />
        </div>
      )}
    </nav>
  )
}

export default Header
