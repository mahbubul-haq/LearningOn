import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem",
  backgroundColor: theme.palette.background.imagesBg,
  borderRadius: "0.25rem",
}));

export default WidgetWrapper;
