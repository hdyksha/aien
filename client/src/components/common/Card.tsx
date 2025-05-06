import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: "default" | "outlined" | "elevated";
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  variant = "default",
}) => {
  const variantClasses = {
    default: "bg-white dark:bg-secondary-800 shadow-card",
    outlined: "bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700",
    elevated: "bg-white dark:bg-secondary-800 shadow-lg",
  };

  return (
    <div
      className={`rounded-xl overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
          <h3 className="text-lg font-medium text-secondary-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
