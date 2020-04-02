import { useEffect } from 'react'

const useOnKeyDownEnter = (activeElementId, callback) => {
  const onKeyDown = e => {
    if (document.activeElement.id === activeElementId) {
      if (e.keyCode === 13 && e.shiftKey) return
      else if (e.key === 'Enter') callback(e)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false)

    return () => document.removeEventListener('keydown', onKeyDown, false)
  })
}

export default useOnKeyDownEnter
