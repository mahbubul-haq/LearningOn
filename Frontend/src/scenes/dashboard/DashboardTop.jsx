import Box from "@mui/material/Box";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BreadCrumbTypography } from "../../components/StyledTypography";
import DashboardTopMobile from "./DashboardTopMobile";

const DashboardTop = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { openedTab, setOpenedTab } = useContext(DashboardContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    // useEffect(() => {
    //     console.log(key);
    // }, [key]);

    return (
        <Box
            sx={{
                padding: isNonMobileScreens ? "2rem 5rem 0rem 5rem" : "1rem 1rem 0rem 1rem",
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
            }}
        >
            <BreadCrumbs
                sx={{
                    color: theme.palette.grey.grey300,
                    "& .MuiBreadcrumbs-separator": {
                        color: theme.palette.grey.grey300,
                    },
                    mb: isNonMobileScreens ? "1rem" : "0.5rem",
                }}
                aria-label="breadcrumb"
            >
                <FlexBetween
                    sx={{
                        cursor: "pointer",

                        gap: "0.5rem",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => navigate("/")}
                >
                    <HomeIcon sx={{ fontSize: "1.2rem" }} />
                    <Typography sx={{ fontSize: "1rem" }}>Home</Typography>
                </FlexBetween>
                <BreadCrumbTypography
                >
                    Dashboard
                </BreadCrumbTypography>
                <BreadCrumbTypography
                >
                    {openedTab}
                </BreadCrumbTypography>
            </BreadCrumbs>
            {isNonMobileScreens && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        position: "sticky",
                        top: "0",
                    }}
                >
                    <Tabs
                        defaultActiveKey="Courses"
                        id="fill-tab-example"
                        className="dashboard-tabs"
                    
                        onSelect={(k) => setOpenedTab(k)}
                      
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          
                            fontSize: "1.2rem",
                            // fontWeight: "bold",
                            color: theme.palette.text.primary,
                        }}
                    >
                        <Tab
                            eventKey="Courses"
                            title="Courses"
                            style={{
                                p: "1rem",
                            }}
                        >
                            {/* Tab content for Home */}
                        </Tab>
                        <Tab eventKey="Blogs" title="Blogs">
                            {/* Tab content for Profile */}
                        </Tab>
                        <Tab eventKey="Tutoring" title="Tutoring">
                            {/* Tab content for Loooonger Tab */}
                        </Tab>
                    </Tabs>
                </Box>
            )}
            {!isNonMobileScreens && (
                <DashboardTopMobile />
            )}
        </Box>
    );
};

export default DashboardTop;
