import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProdvider";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
