
import * as React from "react"

// Adjusted mobile breakpoint to match typical screen sizes
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Use modern event listener approach
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Add the event listener
    mql.addEventListener("change", checkMobile)
    
    // Initial check
    checkMobile()
    
    // Cleanup function
    return () => mql.removeEventListener("change", checkMobile)
  }, [])

  // Return current state, with SSR-friendly fallback
  return isMobile === undefined ? false : isMobile
}
