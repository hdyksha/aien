import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  maxWidth = "lg",
}) => {
  const maxWidthClasses = {
    xs: "max-w-screen-sm",
    sm: "max-w-screen-md",
    md: "max-w-screen-lg",
    lg: "max-w-screen-xl",
    xl: "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 ${maxWidthClasses[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
};
