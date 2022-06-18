import React, { useCallback, useState, useRef, useEffect } from 'react'
import './bubble-input.css'

const BubbleInput = ({ onChange, onSubmit, value }) => {
  const refEditable = useRef()
  const [submitted, setSubmitted] = useState(false)

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const audio = new Audio("/assets/audio/iphone_send.wav");
      audio.play()
      onSubmit && onSubmit()
      e.preventDefault()
      setSubmitted(true)
      setTimeout(() => {
        refEditable.current.focus()
        refEditable.current.innerText = ''
        setSubmitted(false)
      }, 10)
    }else if(e.key === 'Backspace'){
      const audio = new Audio("/assets/audio/turquoise/press/BACKSPACE.mp3");
      audio.play()
    }else if(e.key === ' '){
      const audio = new Audio("/assets/audio/turquoise/press/SPACE.mp3");
      audio.play()
    }else{
      const audio = new Audio("/assets/audio/turquoise/press/GENERIC_R0.mp3");
      audio.play()
    }
    
  }
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable
    if (elDiv) {
      elDiv.focus()
    }
  }, [refEditable])

  useEffect(handleBlur, [handleBlur])

  return (
    <div
      ref={refEditable}
      className={`bubble input ${value.length === 0 ? 'empty' : ''} ${
        submitted ? 'submitted' : ''
      }`}
      contentEditable
      spellCheck="false"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onInput={e => onChange(e.target.innerText)}
    />
  )
}

export default BubbleInput
