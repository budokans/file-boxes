import {
  useState,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
  useEffect
} from "react";
import { useFormState } from "react-dom";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import type { FileBox } from "@/api/schemas";
import { updateFileBox } from "@/api/update";
import { FormModal } from "@/components/FormModal";
import { FileSelect } from "@/components/FileSelect";
import { SubmitForm } from "@/components/SubmitForm";
import Input from "@mui/material/Input";

interface EditExistingProps {
  readonly fileBox: FileBox;
}

export const EditExisting = ({ fileBox }: EditExistingProps): ReactElement => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="Edit file box"
        title="Edit File Box"
        onClick={() => setModalIsOpen(true)}
        disabled={modalIsOpen}
      >
        <EditIcon />
      </IconButton>

      <FormModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {modalIsOpen && (
          <EditForm fileBox={fileBox} setIsOpen={setModalIsOpen} />
        )}
      </FormModal>
    </>
  );
};

interface CreateNewFormProps extends EditExistingProps {
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EditForm = ({ fileBox, setIsOpen }: CreateNewFormProps): ReactElement => {
  const [state, formAction] = useFormState(updateFileBox, {
    message: "",
    success: false
  });

  useEffect(() => {
    state.success && setIsOpen(false);
  }, [state, setIsOpen]);

  return (
    <>
      <Typography id="edit-modal-title" variant="h6" component="h2">
        Edit File Box
      </Typography>

      <Stack
        rowGap="1.5rem"
        component="form"
        noValidate
        autoComplete="off"
        action={formAction}
      >
        <Input
          name="id"
          sx={{
            display: "none"
          }}
          defaultValue={fileBox.id}
        />
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          defaultValue={fileBox.title}
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          defaultValue={fileBox.description}
        />

        {!fileBox.storageFilename && <FileSelect />}
        <SubmitForm />
      </Stack>
    </>
  );
};
