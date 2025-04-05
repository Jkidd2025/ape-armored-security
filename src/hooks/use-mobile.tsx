
import * as React from "react"

// Adjusted mobile breakpoint to match typical screen sizes
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with the current window width if in browser environment
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false // Default for SSR
  })

  React.useEffect(() => {
    // Skip in non-browser environments
    if (typeof window === 'undefined') return undefined
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Use modern event listener approach with MediaQueryList
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Add the event listener
    mql.addEventListener("change", checkMobile)
    
    // Initial check (although we have a default now, this ensures consistency)
    checkMobile()
    
    // Cleanup function
    return () => mql.removeEventListener("change", checkMobile)
  }, [])

  return isMobile
}
