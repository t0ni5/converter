import { Stack, Alert } from "@mui/material";
import { setNotification } from "../store/converter.slice";
import { useAppDispatch } from "../../../hooks/hooks";

interface ActionAlertProps {
  alertMessage?: string | null;
}

const ActionAlert: React.FC<ActionAlertProps> = ({
  alertMessage,
}: ActionAlertProps) => {
  const dispatch = useAppDispatch();

  const handleAlertClosed = () => {
    dispatch(setNotification(""));
  };

  return alertMessage !== "" ? (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error" onClose={handleAlertClosed}>
        {alertMessage}
      </Alert>
    </Stack>
  ) : null;
};
export default ActionAlert;
