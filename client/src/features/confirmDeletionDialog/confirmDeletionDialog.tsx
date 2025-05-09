import { Box, Button, Typography } from "@mui/material";
import { DialogStyles } from "../../components/styles/confirmDeletionDialog.styed";
import CloseIcon from "@mui/icons-material/Close";
import Strings from "../../utils/strings";

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
            {Strings.confirmationDialog.text.confirmation}
          </Typography>
          <div className="btn-container">
            <Button variant="contained" color="error" onClick={onConfirm}>
              {Strings.confirmationDialog.text.yes}
            </Button>
            <Button
              onClick={onCancel}
              type="button"
              variant="outlined"
              color="inherit"
            >
              {Strings.confirmationDialog.text.no}
            </Button>
          </div>
        </div>
      </Box>
    </DialogStyles>
  );
};

export default ConfirmDeletionDialog;
