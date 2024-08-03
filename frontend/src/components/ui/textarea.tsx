import * as React from "react"; 
import { cn } from "@/lib/utils"; 

// Defining the TextareaProps interface, extending the built-in React TextareaHTMLAttributes for HTML textarea elements
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Defining the Textarea component using React.forwardRef to support forwarding refs
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Combining the default styles with any additional class names passed as props
        )}
        ref={ref} // Forwarding the ref to the textarea element
        {...props} // Spreading any additional props onto the textarea element
      />
    );
  }
);

// Setting a display name for the Textarea component (useful for debugging in React DevTools)
Textarea.displayName = "Textarea";

export { Textarea };
