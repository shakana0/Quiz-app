import { Alert, AlertColor, Snackbar as MuiSnackbar } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  msg: string;
  bgColor: AlertColor;
  onCancel: () => void;
}

const SnackBar = ({ open, msg, bgColor, onCancel }: SnackBarProps) => {
  return (
    <>
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={onCancel}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onCancel} severity={bgColor} variant="filled" sx={{ width: "100%" }}>
       {msg}
      </Alert>
    </MuiSnackbar>
    </>
    
  );
};

export default SnackBar;
