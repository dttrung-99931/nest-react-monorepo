import * as React from "react"
import { cn } from "#lib/utils"

type HorizontalProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Horizontal
 * 
 * A simple horizontal flex container for layout composition.
 */
const Horizontal = React.forwardRef<HTMLDivElement, HorizontalProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-row items-center", className)}
      {...props}
    >
      {children}
    </div>
  )
)
Horizontal.displayName = "Horizontal"

export { Horizontal }