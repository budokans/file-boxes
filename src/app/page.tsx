import type { ReactElement } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FileBox } from "@/components/FileBox";
import { CreateNew } from "@/components/CreateNew";

const Home = (): ReactElement => (
  <>
    <header>
      <Typography variant="h2" component="h1" textAlign="center">
        File Boxes
      </Typography>
    </header>

    <Divider flexItem />

    <Stack component="main" rowGap="1.5rem">
      <header>
        <Stack direction="row">
          <Typography variant="h4" component="h2">
            My Boxes
          </Typography>

          <CreateNew />
        </Stack>
      </header>

      <Stack direction="row" gap="1rem" flexWrap="wrap">
        {/* TODO: Replace with fetched data */}
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
        <FileBox
          title="Test title est titl est titl est titl"
          description="Test description Test description Test description Test description"
        />
      </Stack>
    </Stack>
  </>
);

export default Home;
