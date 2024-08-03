import * as React from "react";
import { cn } from "@/lib/utils"; 

// Defining the InputProps interface, extending the built-in React InputHTMLAttributes for HTML input elements
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Defining the Input component using React.forwardRef to support forwarding refs
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Setting the type of the input (e.g., text, password, etc.)
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Combining the default styles with any additional class names passed as props
        )}
        ref={ref} // Forwarding the ref to the input element
        {...props} // Spreading any additional props onto the input element
      />
    );
  }
);

// Setting a display name for the Input component (useful for debugging in React DevTools)
Input.displayName = "Input";

export { Input };
