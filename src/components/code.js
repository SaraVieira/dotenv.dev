/* eslint-disable object-curly-newline */
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { compose, tokens as styleTokens } from 'classy-ui/macro'
import CopyIcon from 'react-icons/lib/io/ios-copy'
import { useClipboard, useToast } from '@chakra-ui/core'

const Code = ({ code }) => {
  const toast = useToast()
  const [value] = React.useState('code')
  const { onCopy, hasCopied } = useClipboard(value)

  if (hasCopied) {
    toast({
      title: 'Copied',
      status: 'success',
      duration: 1000
    })
  }
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language="json">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            compose(
              styleTokens.padding.SPACING_4,
              styleTokens.position.RELATIVE
            ) + className
          }
          style={{
            ...style,
            maxHeight: 400,
            overflowY: 'scroll',
            overflowX: 'visible'
          }}
        >
          <button
            className={compose(
              styleTokens.right.SPACING_4,
              styleTokens.position.ABSOLUTE,
              styleTokens.backgroundColor.TRANSPARENT,
              styleTokens.borderWidth.NONE,
              styleTokens.cursor.POINTER
            )}
            onClick={onCopy}
            type="button"
          >
            <CopyIcon color="white" />
          </button>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Code
