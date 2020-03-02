/* eslint-disable operator-linebreak */
import React, { useState } from 'react'
import { compose, tokens } from 'classy-ui/macro'
import { navigate } from '@reach/router'
import FileUploader from 'react-firebase-file-uploader'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { myFirebase } from '../firebase/firebase'

import { useOvermind } from '../overmind/index.ts'

function App() {
  const { state, actions } = useOvermind()
  const [progress, setProgress] = useState(null)
  const [progressTerminal, setProgressTerminal] = useState(null)
  const [editorType, setEditorType] = useState(state.editors[0])
  const [terminalType, setTerminalType] = useState(state.terminals[0])
  const [theme, setTheme] = useState()
  const [extra, setExtra] = useState('')
  const [vscodeConfig, setVscodeConfig] = useState('')
  const [editorScreenshot, setEditorScreenshot] = useState('')
  const [terminalConfig, setTerminalConfig] = useState('')
  const [terminalScreenshot, setTerminalScreenshot] = useState('')

  const disabled =
    !vscodeConfig ||
    !editorScreenshot ||
    !terminalConfig ||
    !terminalScreenshot ||
    !theme ||
    state.isCreating

  const handleUploadSuccessEditor = filename => {
    myFirebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => setEditorScreenshot(url))
  }

  const handleUploadSuccessTerminal = filename => {
    myFirebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => setTerminalScreenshot(url))
  }

  const submit = async () => {
    await actions.addEnvironment({
      terminal: {
        screenshot: terminalScreenshot,
        config: terminalConfig,
        type: terminalType
      },
      editor: {
        screenshot: editorScreenshot,
        config: vscodeConfig,
        type: editorType
      },
      extra
    })
    navigate(`/environment/${state.createdId}`)
  }

  return (
    <div className="App">
      <div
        className={compose(
          tokens.marginVertical.SPACING_12,
          tokens.width.WIDTH_10_12,
          tokens.marginHorizontal.AUTO
        )}
      >
        <h1>Add your environment</h1>
        <h2>Theme</h2>
        <input
          type="radio"
          id="dark"
          name="theme"
          value="dark"
          onChange={() => setTheme('dark')}
          checked={theme === 'dark'}
        />
        <label htmlFor="dark">Dark</label>
        <br />
        <input
          type="radio"
          id="light"
          name="theme"
          value="light"
          onChange={() => setTheme('light')}
          checked={theme === 'light'}
        />
        <label htmlFor="light">Light</label>
        <br />
        <h2>Editor</h2>
        <h3>Select Your editor</h3>
        <select onChange={e => setEditorType(e.target.value)}>
          {state.editors.map(editor => (
            <option key={editor} value="editor">
              {editor}
            </option>
          ))}
        </select>
        <h3>Upload a Screenshot</h3>
        {editorScreenshot ? (
          <>
            <img src={editorScreenshot} width="300" alt="Editor" />
            <button type="button" onClick={() => setEditorScreenshot(null)}>
              Delete Screenshot
            </button>
          </>
        ) : (
          <>
            <FileUploader
              className="file-input"
              accept="image/*"
              name="editorImage"
              id="editorImage"
              randomizeFilename
              storageRef={myFirebase.storage().ref('images')}
              onUploadSuccess={handleUploadSuccessEditor}
              onProgress={p => setProgress(p)}
            />
            <label htmlFor="editorImage">
              {typeof progress === 'number'
                ? `${progress}% done`
                : 'Choose an image'}
            </label>
          </>
        )}
        <h3>Upload your User Settings</h3>
        <CodeMirror
          value={vscodeConfig}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          onBeforeChange={(_, __, value) => {
            setVscodeConfig(value)
          }}
        />
        <h2>Terminal</h2>
        <h3>Select Your terminal</h3>
        <select onChange={e => setTerminalType(e.target.value)}>
          {state.terminals.map(terminal => (
            <option key={terminal} value={terminal}>
              {terminal}
            </option>
          ))}
        </select>
        <h3>Upload a Screenshot</h3>
        {terminalScreenshot ? (
          <>
            <img src={terminalScreenshot} width="300" alt="Terminal" />
            <button type="button" onClick={() => setTerminalScreenshot(null)}>
              Delete Screenshot
            </button>
          </>
        ) : (
          <>
            <FileUploader
              accept="image/*"
              name="avatar"
              className="file-input"
              randomizeFilename
              storageRef={myFirebase.storage().ref('images')}
              onUploadSuccess={handleUploadSuccessTerminal}
              onProgress={p => setProgressTerminal(p)}
            />
            <label htmlFor="editorImage">
              {typeof progressTerminal === 'number'
                ? `${progressTerminal}% done`
                : 'Choose an image'}
            </label>
          </>
        )}
        <h3>Upload your User Settings</h3>
        <CodeMirror
          value={terminalConfig}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          onBeforeChange={(_, __, value) => {
            setTerminalConfig(value)
          }}
        />

        <h2>Anything you want to add?</h2>
        <textarea value={extra} onChange={e => setExtra(e.target.value)} />

        <button disabled={disabled} type="submit" onClick={submit}>
          {state.isCreating ? 'Creating' : 'Add your environment'}
        </button>
      </div>
    </div>
  )
}

export default App
