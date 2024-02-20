"use client";

import type { ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { DownloadFile } from "@/components/DownloadFile";

interface FileBoxProps {
  readonly title: string;
  readonly description: string;
  readonly filename?: string;
}

export const FileBox = ({
  title,
  description,
  filename
}: FileBoxProps): ReactElement => (
  <>
    <Card
      sx={({ breakpoints }) => ({
        [breakpoints.down("sm")]: { width: "100%" },
        width: "250px"
      })}
    >
      <CardHeader
        action={
          <>
            <IconButton aria-label="Edit file box" title="Edit File Box">
              <EditIcon />
            </IconButton>

            <DownloadFile filename={filename} />
          </>
        }
        component="header"
        title={title}
      />

      <CardContent>
        <Stack rowGap="1rem">
          <Typography variant="body1">{description}</Typography>

          <Typography variant="body1" sx={{ wordWrap: "anywhere" }}>
            {filename ?? "This box is empty."}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </>
);
