import type { ReactElement, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

const RootLayout = ({
  children
}: {
  readonly children: ReactNode;
}): ReactElement => (
  <html lang="en">
    <body>
      <AppRouterCacheProvider>
        <CssBaseline />
        {children}
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
