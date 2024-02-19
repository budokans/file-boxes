"use client";

import {
  useState,
  type ReactElement,
  type Dispatch,
  type SetStateAction
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createFileBox } from "@/api/create";

export const CreateNew = (): ReactElement => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginLeft: "auto" }}
        onClick={() => setModalIsOpen(true)}
        disabled={modalIsOpen}
      >
        Create new
      </Button>

      <CreateFormModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </>
  );
};

interface CreateFormModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateFormModal = ({
  isOpen,
  setIsOpen
}: CreateFormModalProps): ReactElement => {
  const { pending } = useFormStatus();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useFormState(createFileBox, {
    message: "",
    success: false
  });

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="create-modal-title"
    >
      <Stack
        position="absolute"
        rowGap="1.5rem"
        top="50%"
        left="50%"
        width="24rem"
        bgcolor="white"
        border="2px solid black"
        boxShadow={24}
        padding="1rem"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Typography id="create-modal-title" variant="h6" component="h2">
          Create a new File Box
        </Typography>

        <Stack
          rowGap="1.5rem"
          component="form"
          noValidate
          autoComplete="off"
          action={formAction}
        >
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            defaultValue=""
            placeholder="My File Box..."
          />
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            defaultValue=""
            placeholder="File box containing..."
          />

          <Button
            variant="outlined"
            component="label"
            role={undefined}
            startIcon={<AttachFileIcon />}
            tabIndex={-1}
          >
            Select File
            <Input
              required
              type="file"
              name="file"
              inputProps={{ accept: ".csv" }}
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
              disabled={pending}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            role="submit"
            startIcon={<CloudUploadIcon />}
            disabled={pending}
          >
            Save File Box
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
