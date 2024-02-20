import type { ReactElement } from "react";
import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const SubmitForm = (): ReactElement => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      role="submit"
      startIcon={
        pending ? <CircularProgress size="1rem" /> : <CloudUploadIcon />
      }
      disabled={pending}
    >
      Save File Box
    </Button>
  );
};
