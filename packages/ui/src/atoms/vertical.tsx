import * as React from "react"
import { cn } from "#lib/utils"

type VerticalProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Vertical
 * 
 * A simple vertical flex container for layout composition.
 */
const Vertical = React.forwardRef<HTMLDivElement, VerticalProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  )
)
Vertical.displayName = "Vertical"

export { Vertical }