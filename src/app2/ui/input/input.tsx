import * as React from "react";

import styles from "./index.module.css";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onPasswordVisible?: (name: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className = "", ...props }, ref) => {
    if (type === "password") {
      return (
        <div style={{ position: "relative", width: "max-content" }}>
          <input
            ref={ref}
            type={type}
            className={`${styles.Input} ${className}`}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        className={`${styles.Input} ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
