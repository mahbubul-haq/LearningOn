import Box from "@mui/material/Box";
import { useContext } from "react";
import { AdminContext } from "../../state/AdminContext";
import AdminMain from "./AdminMain";
import Login from "./Login";

const Admin = () => {
  const { adminToken } = useContext(AdminContext);

  return <Box>{adminToken ? <AdminMain /> : <Login />}</Box>;
};

export default Admin;
