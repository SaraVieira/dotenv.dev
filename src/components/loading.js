import React from 'react'
import { compose, tokens } from 'classy-ui/macro'

const Loading = () => (
  <div
    className={compose(
      tokens.marginVertical.SPACING_12,
      tokens.width.WIDTH_10_12,
      tokens.marginHorizontal.AUTO
    )}
  >
    <div className="container">
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
      <div className="ball" />
    </div>
  </div>
)

export default Loading
