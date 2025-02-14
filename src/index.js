import React, { useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'

import SignatureCanvas from 'react-signature-canvas'

import * as styles from './styles.module.css'

function App () {
  const sigCanvas = useRef(null)
  const [trimmedDataURL, setTrimmedDataURL] = useState(null)

  function clear () {
    sigCanvas.current.clear()
  }

  function trim () {
    setTrimmedDataURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
  }

  return (
    <div className={styles.container}>
      <div className={styles.sigContainer}>
        <SignatureCanvas canvasProps={{ className: styles.sigCanvas }} ref={sigCanvas} />
      </div>
      <div>
        <button className={styles.buttons} onClick={clear}>Clear</button>
        <button className={styles.buttons} onClick={trim}>Trim</button>
      </div>
      {trimmedDataURL
        ? <img className={styles.sigImage} alt='signature' src={trimmedDataURL} />
        : null}
    </div>
  )
}

createRoot(document.getElementById('container')).render(<App />)
