import type { ReactElement, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const RootLayout = ({
  children
}: {
  readonly children: ReactNode;
}): ReactElement => (
  <html lang="en">
    <body>
      <AppRouterCacheProvider>
        <CssBaseline />
        <Box maxWidth="1400px" padding={["1%", "2%", "3%"]} marginX="auto">
          <Stack rowGap="1.5rem">{children}</Stack>
        </Box>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
