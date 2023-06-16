import { Box, Button, Modal, Typography } from "@mui/material";

interface DialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeletionDialog = ({ open, onConfirm, onCancel }: DialogProps) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        // flexDirection="row"
        mt={6}
        style={{
          gap: "50px",
        }}
      >
        <Button variant="contained" color="error" onClick={onConfirm}>
          Yes
        </Button>
        <Button
          onClick={onCancel}
          type="button"
          variant="outlined"
          color="inherit"
        >
          No
        </Button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
      </Box>
    </Modal>
  );
};

export default ConfirmDeletionDialog;
