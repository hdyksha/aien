import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = "",
  id,
  ...rest
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const baseInputClasses = "px-4 py-2 rounded-lg border focus:outline-none focus:ring-2";
  const stateClasses = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : "border-secondary-300 focus:border-primary-500 focus:ring-primary-200 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white";
  
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseInputClasses} ${stateClasses} ${widthClass} ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
