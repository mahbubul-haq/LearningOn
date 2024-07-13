import Box from "@mui/material/Box";
import { useContext } from "react";
import { StyledButton } from "../../components/StyledButton";
import StyledTextField1 from "../../components/StyledTextField1";
import { AdminContext } from "../../state/AdminContext";

const Login = () => {

    const {username, setUsername, password, setPassword, login} = useContext(AdminContext);

  return (
    <Box sx={{
        width: "100%",
        height: "100vh",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
}}>
    <Box
        onSubmit={login}
         component="form"
     sx={{
        display: "flex",
        flexDirection: "column",
    }}>
        <StyledTextField1 sx={{
            "&&": {
                background: "white"
            }
        }}
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField1
            value={password}
            onChange={e => setPassword(e.target.value)}
         sx={{
            "&&": {
                background: "white",
            }
        }}
        label="Password"/>
        <StyledButton type="submit">
            Log In
        </StyledButton>
        </Box>
    </Box>
  )
}

export default Login