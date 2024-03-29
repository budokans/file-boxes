"use client";

import {
  useState,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
  useEffect
} from "react";
import { useFormState } from "react-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createFileBox } from "@/api/create";
import { FormModal } from "@/components/FormModal";
import { FileSelect } from "@/components/FileSelect";
import { SubmitForm } from "@/components/SubmitForm";

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

interface CreateNewFormProps {
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateNewForm = ({ setIsOpen }: CreateNewFormProps): ReactElement => {
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
        <SubmitForm />
      </Stack>
    </>
  );
};
