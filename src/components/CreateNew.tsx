"use client";

import {
  useState,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  type ChangeEvent,
  useEffect
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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

      <FormModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {modalIsOpen && <CreateNewForm setIsOpen={setModalIsOpen} />}
      </FormModal>
    </>
  );
};

interface FormModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly children: ReactNode;
}

export const FormModal = ({
  isOpen,
  setIsOpen,
  children
}: FormModalProps): ReactElement => (
  <Modal
    open={isOpen}
    onClose={() => setIsOpen(false)}
    aria-labelledby="edit-modal-title"
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
      {children}
    </Stack>
  </Modal>
);

interface CreateNewFormProps {
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateNewForm = ({ setIsOpen }: CreateNewFormProps): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(createFileBox, {
    message: "",
    success: false
  });

  useEffect(() => {
    state.success && setIsOpen(false);
  }, [state, setIsOpen]);

  return (
    <>
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

        <FileSelect />
        <Submit />
      </Stack>
    </>
  );
};

const FileSelect = (): ReactElement => {
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

const Submit = (): ReactElement => {
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
