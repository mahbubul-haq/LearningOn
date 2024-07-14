import Box from "@mui/material/Box";
import { useContext } from "react";
import { AdminContext } from "../../state/AdminContext";
import AdminMain from "./AdminMain";
import Login from "./Login";

const Admin = () => {
  const { adminToken } = useContext(AdminContext);

  return <Box sx={{
    height: "100%",
    width: "100%",
  }}>{adminToken ? <AdminMain /> : <Login />}</Box>;
};

export default Admin;
