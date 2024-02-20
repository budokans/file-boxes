import { useState, type ReactElement } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { s3File } from "@/api/read";
import { downloadFile } from "@/browser-io";

interface DownloadFileProps {
  readonly filename: string | undefined;
}

export const DownloadFile = ({ filename }: DownloadFileProps): ReactElement => {
  const [downloadIsLoading, setDownloadIsLoading] = useState(false);
  const [downloadError, setDownloadError] = useState<Error | null>(null);
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const handleDownloadClick = async (filename: string): Promise<void> => {
    setDownloadIsLoading(true);

    try {
      const fileString = await s3File(filename);
      const file = new File([fileString], filename);
      downloadFile(file, filename);
    } catch (error) {
      setDownloadError(
        new Error(error instanceof Error ? error.message : "Download failed.")
      );
    } finally {
      setDownloadIsLoading(false);
      setToastIsOpen(true);
    }
  };

  return (
    <>
      <IconButton
        aria-label="Download file"
        disabled={!filename || downloadIsLoading}
        title="Download file"
        onClick={async () => {
          filename && (await handleDownloadClick(filename));
        }}
      >
        <CloudDownloadIcon />
      </IconButton>

      <Snackbar
        open={toastIsOpen}
        autoHideDuration={6000}
        onClose={() => {
          setDownloadError(null);
          setToastIsOpen(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={downloadError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {downloadError ? downloadError.message : "Download succeeded."}
        </Alert>
      </Snackbar>
    </>
  );
};
