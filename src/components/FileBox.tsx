"use client";

import type { ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FileBox as FileBoxSchema } from "@/api/schemas";
import { DownloadFile } from "@/components/DownloadFile";
import { EditExisting } from "@/components/EditExisting";

interface FileBoxProps {
  readonly fileBox: FileBoxSchema;
}

export const FileBox = ({ fileBox }: FileBoxProps): ReactElement => (
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
            <EditExisting fileBox={fileBox} />
            <DownloadFile filename={fileBox.storageFilename} />
          </>
        }
        component="header"
        title={fileBox.title}
      />

      <CardContent>
        <Stack rowGap="1rem">
          <Typography variant="body1">{fileBox.description}</Typography>

          <Typography variant="body1" sx={{ wordWrap: "anywhere" }}>
            {fileBox.storageFilename ?? "This box is empty."}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </>
);
