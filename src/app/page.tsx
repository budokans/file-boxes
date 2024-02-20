import type { ReactElement } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FileBox } from "@/components/FileBox";
import { CreateNew } from "@/components/CreateNew";
import { getAllFileBoxes } from "@/api/read";

const Home = async (): Promise<ReactElement> => {
  const fileBoxesOrError = await getAllFileBoxes();

  return (
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
          {fileBoxesOrError instanceof Error ? (
            <Typography variant="body1" color="error">
              {fileBoxesOrError.message}
            </Typography>
          ) : (
            fileBoxesOrError.map((fileBox, idx) => (
              <FileBox fileBox={fileBox} key={idx} />
            ))
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
