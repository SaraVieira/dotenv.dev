/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react'
import { Link } from '@reach/router'
import { compose, tokens } from 'classy-ui/macro'
import { useOvermind } from '../overmind/index.ts'
// import Code from '../components/code'
import './pages.css'

const Index = () => {
  const { state } = useOvermind()
  const [hover, setHover] = useState()

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
        <div>
          <Link key={env.id} to={`/environment/${env.id}`}>
            <div
              onMouseEnter={() => setHover(env.id)}
              onMouseLeave={() => setHover(null)}
              style={{ height: 200 }}
              className={compose(
                tokens.maxWidth.FULL,
                tokens.display.FLEX,
                tokens.position.RELATIVE
              )}
            >
              <div
                className="screenshot"
                style={{
                  backgroundImage:
                    hover === env.id
                      ? `url(${env.terminal.screenshot})`
                      : `url(${env.editor.screenshot})`
                }}
              >
                <span
                  className={compose(
                    tokens.position.ABSOLUTE,
                    tokens.backgroundColor.GRAY_900,
                    tokens.color.GRAY_100,
                    tokens.paddingHorizontal.SPACING_6,
                    tokens.paddingVertical.SPACING_3,
                    tokens.bottom.NONE,
                    tokens.fontSize.BASE,
                    tokens.fontWeight.BOLD
                  )}
                >
                  {hover === env.id ? env.terminal.type : env.editor.type}
                </span>
              </div>
            </div>
          </Link>
          <div
            className={compose(
              tokens.display.FLEX,
              tokens.alignItems.CENTER,
              tokens.justifyContent.BETWEEN,
              tokens.padding.SPACING_4,
              tokens.marginHorizontal.AUTO,
              tokens.backgroundColor.GRAY_900,
              tokens.color.GRAY_100
            )}
          >
            <div
              className={compose(tokens.display.FLEX, tokens.alignItems.CENTER)}
            >
              <img
                className={compose(
                  tokens.borderRadius.FULL,
                  tokens.marginRight.SPACING_3
                )}
                src={env.user.photoURL}
                alt={env.user.username}
              />
              <p>{env.user.username}</p>
            </div>
            <div>#{env.theme}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Index
