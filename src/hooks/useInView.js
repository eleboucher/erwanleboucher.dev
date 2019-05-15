import { useEffect, useState, useRef } from 'react'

const useInView = ({ root = null, threshold = 0, rootMargin = '0px' }) => {
  const ref = useRef()
  const [inView, setInView] = useState(false)

  const callback = ([entry]) => {
    if (entry.isIntersecting) {
      setInView(true)
    } else {
      setInView(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    })
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) {
        return observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, inView]
}

export default useInView
