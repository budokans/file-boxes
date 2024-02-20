import { useState, type ReactElement, type ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export const FileSelect = (): ReactElement => {
  const [selectedFilename, setSelectedFilename] = useState("");

  return (
    <>
      <Button
        variant="outlined"
        component="label"
        role={undefined}
        startIcon={<AttachFileIcon />}
        tabIndex={-1}
        sx={{
          overflow: "hidden"
        }}
      >
        {selectedFilename ? selectedFilename : "Select File"}
        <Input
          required
          type="file"
          name="file"
          inputProps={{ accept: ".csv" }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files ? event.target.files[0] : null;
            file && setSelectedFilename(file.name);
          }}
          sx={{
            clip: "rect(0,0,0,0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whitespace: "nowrap",
            width: 1
          }}
        />
      </Button>
    </>
  );
};
