import React, { ReactNode } from "react";
import { Container } from "./Container";

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  containerMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  containerMaxWidth = "lg",
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50 dark:bg-secondary-900">
      {/* Header */}
      {header && (
        <header className="bg-white dark:bg-secondary-800 shadow-sm">
          <Container maxWidth={containerMaxWidth}>
            <div className="py-4">{header}</div>
          </Container>
        </header>
      )}

      {/* Main content */}
      <main className="flex-grow">
        <Container maxWidth={containerMaxWidth}>
          <div className="py-6">
            {sidebar ? (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">{sidebar}</div>
                
                {/* Main content */}
                <div className="flex-grow">{children}</div>
              </div>
            ) : (
              children
            )}
          </div>
        </Container>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">
          <Container maxWidth={containerMaxWidth}>
            <div className="py-4">{footer}</div>
          </Container>
        </footer>
      )}
    </div>
  );
};
