import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.tsx";
import "remixicon/fonts/remixicon.css";

import { Providers } from "./providers/Providers.tsx";
import { Web3Provider } from "./providers/Web3Provider.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Web3Provider>
        <Providers>
          <RouterProvider router={router} />
        </Providers>
      </Web3Provider>
    </QueryProvider>
  </StrictMode>
);
