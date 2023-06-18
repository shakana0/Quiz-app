import { Box, Button, Modal, Typography } from "@mui/material";
import { DialogStyles } from "../../components/styles/confirmDeletionDialog.styed";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeletionDialog = ({ open, onConfirm, onCancel }: DialogProps) => {
  return (
    <DialogStyles
      open={open}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={"modal"}
    >
      <Box className={"box"}>
        <CloseIcon className="close-icon" onClick={onCancel} />
        <div className="info-container">
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Are you sure you want to delete this quiz?
          </Typography>
          <div className="btn-container">
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
          </div>
        </div>
      </Box>
    </DialogStyles>
  );
};

export default ConfirmDeletionDialog;
