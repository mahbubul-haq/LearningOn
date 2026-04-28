import RootRoutes from "./routes/RootRoutes";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <CssBaseline>
        <RootRoutes />
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;