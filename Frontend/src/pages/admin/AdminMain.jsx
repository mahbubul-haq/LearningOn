import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect } from 'react';
import { StyledButton } from "../../components/StyledButton";
import { AdminContext } from '../../state/AdminContext';
import UnpublishedCourses from "./UnpublishedCourses";

const AdminMain = () => {
    const theme = useTheme();
    const { verifyAdmin, setQuery, query, setLoading} = useContext(AdminContext);

    
    useEffect(() => {
        //console.log("admin main calling");
        verifyAdmin();
    }, []);

  return (
    <Box sx={{
        height: "100%",
        maxWidth: "2000px",
        // background: "black",
        mx: "auto",
        display: "grid",
        gridTemplateColumns: "auto 80%",
    }}>
        <Box sx={{
            background: theme.palette.background.alt,
            p: "2rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflowY: "auto",
            overflowX: "hidden"
        }}>
            <StyledButton onClick={() => {
                setLoading(true);
                setQuery("unpublished-courses")
            }}>
                Unlisted Courses
            </StyledButton>
            <StyledButton>
                Users
            </StyledButton>
            <StyledButton>
                Unlisted Courses
            </StyledButton>
        </Box>
        <Box sx={{
            p: "2rem 1rem",
            flex: 1,
        }}>
            {query === "unpublished-courses" && <UnpublishedCourses />}
        </Box>
        
    </Box>
  )
}

export default AdminMain