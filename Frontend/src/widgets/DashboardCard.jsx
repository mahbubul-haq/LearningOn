import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const DashboardCard = ({ title, value }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const theme = useTheme();
    return (
        <Box
            sx={{
                padding: "1rem",
                backgroundColor: theme.palette.neutral.offWhite,

                borderRadius: "0.5rem",
                minWidth: isNonMobileScreens ? "240px" : "200px",
            }}
        >
            <Typography
                sx={{
                    fontSize: "1.1rem",
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem 2rem",

                }}
            >
                <Typography
                    sx={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export default DashboardCard;
