import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProdvider";
import { RoleProvider } from "../context/RoleContext";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider>
      <RoleProvider>{children}</RoleProvider>
    </ThemeProvider>
  );
}
