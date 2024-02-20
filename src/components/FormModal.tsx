import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

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
