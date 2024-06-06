import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";
import useTheme from "@mui/material/styles/useTheme";
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";
import { useState } from "react";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";

const DashboardTopMobile = () => {
    const theme = useTheme();
    const [anchorElLeft, setAnchorElLeft] = useState(null);
    const [anchorElRight, setAnchorElRight] = useState(null);
    const [anchorElOptions, setAnchorElOptions] = useState(null);
    const { openedTab, setOpenedTab } = useContext(DashboardContext);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
            }}
        >
            <IconButton
                onClick={(event) => {
                    setAnchorElLeft(event.currentTarget);
                }}
                title="Select Course"
            >
                <ViewModuleIcon
                    sx={{
                        fontSize: "1.5rem",
                        color: theme.palette.grey.grey400,
                        "&:hover": {
                            color: theme.palette.grey.grey800,
                        },
                    }}
                />
            </IconButton>
            <Menu
                id="dashboard-left-menu"
                anchorEl={anchorElLeft}
                open={Boolean(anchorElLeft)}
                onClose={() => setAnchorElLeft(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box
                    sx={{
                        p: "2rem 1rem 1rem 1rem",
                        position: "relative",
                    }}
                >
                    <CloseIcon
                        sx={{
                            position: "absolute",
                            top: "0.2rem",
                            right: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => setAnchorElLeft(null)}
                    />
                    <DashboardLeft />
                </Box>
            </Menu>

            <IconButton
                onClick={(event) => {
                    setAnchorElOptions(event.currentTarget);
                }}
                title="Select Category"
            >
                <CategoryIcon
                    sx={{
                        fontSize: "1.5rem",
                        color: theme.palette.grey.grey400,
                        "&:hover": {
                            color: theme.palette.grey.grey800,
                        },
                    }}
                />
            </IconButton>
            <Menu
                id="dashboard-options-menu"
                anchorEl={anchorElOptions}
                open={Boolean(anchorElOptions)}
                onClose={() => setAnchorElOptions(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box
                    sx={{
                        p: "2rem 2rem 1rem 2rem",
                        position: "relative",
                    }}
                >
                    <CloseIcon
                        sx={{
                            position: "absolute",
                            top: "0.2rem",
                            right: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => setAnchorElOptions(null)}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            mt: "0.5rem",
                            minWidth: "120px",
                            // alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.2rem",
                                fontWeight:
                                    openedTab === "Courses" ? "bold" : "normal",
                                "&:hover": {
                                    fontWeight: "bold",
                                },
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setOpenedTab("Courses");
                                setAnchorElOptions(null);
                            }}
                        >
                            Courses
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.2rem",
                                fontWeight:
                                    openedTab === "Blogs" ? "bold" : "normal",
                                "&:hover": {
                                    fontWeight: "bold",
                                },
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setOpenedTab("Blogs");
                                setAnchorElOptions(null);
                            }}
                        >
                            Blogs
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.2rem",
                                fontWeight:
                                    openedTab === "Tutoring"
                                        ? "bold"
                                        : "normal",
                                "&:hover": {
                                    fontWeight: "bold",
                                },
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setOpenedTab("Tutoring");
                                setAnchorElOptions(null);
                            }}
                        >
                            Tutoring
                        </Typography>
                    </Box>
                </Box>
            </Menu>

            <IconButton
                onClick={(event) => {
                    setAnchorElRight(event.currentTarget);
                }}
                title="Recent Enrollments"
            >
                <GroupIcon
                    sx={{
                        fontSize: "1.5rem",
                        color: theme.palette.grey.grey400,
                        "&:hover": {
                            color: theme.palette.grey.grey800,
                        },
                    }}
                />
            </IconButton>
            <Menu
                id="dashboard-right-menu"
                anchorEl={anchorElRight}
                open={Boolean(anchorElRight)}
                onClose={() => setAnchorElRight(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box
                    sx={{
                        p: "2rem 1rem 1rem 1rem",
                        position: "relative",
                    }}
                >
                    <CloseIcon
                        sx={{
                            position: "absolute",
                            top: "0.2rem",
                            right: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => setAnchorElRight(null)}
                    />
                    <DashboardRight />
                </Box>
            </Menu>
        </Box>
    );
};

export default DashboardTopMobile;
