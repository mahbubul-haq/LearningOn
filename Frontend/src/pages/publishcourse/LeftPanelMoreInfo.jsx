import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import useTheme from "@mui/material/styles/useTheme";
import { StyledCheckbox } from "../../components/StyledButton";
import FlexBetween from "../../components/FlexBetween";

const LeftPanelMoreInfo = ({
    moreInfo,
    courseState,
    setInputSection,
    inputSection,
}) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",

                // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
                cursor: "pointer",
            }}
            onClick={() => setInputSection("more info")}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "600",
                    mb: "0.2rem",
                    cursor: "pointer",
                    padding: "0 0rem 0rem 2rem",
                }}
                onClick={() => setInputSection("more info")}
            >
                More Info
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    // borderLeft:
                    //     inputSection === "more info"
                    //         ? `4px solid ${theme.palette.grey.grey400}`
                    //         : "",
                    padding: "0 0rem 0rem 2rem",
                    transition: "border 0.3s",
                }}
            >
                {moreInfo.map((item) => (
                    <FlexBetween
                        key={item}
                        gap="0.5rem"
                        sx={{
                            "&&": {
                                justifyContent: "flex-start",
                                alignItems: "center",
                                cursor: "pointer",
                            },
                        }}
                        onClick={() => setInputSection("more info")}
                    >
                        <StyledCheckbox
                            icon={
                                <RadioButtonUncheckedIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checkedIcon={
                                <CheckCircleIcon
                                    sx={{
                                        fontSize: "1.1rem",
                                    }}
                                />
                            }
                            checked={courseState[item[1]].length > 0}
                            sx={{
                                "&&": {
                                    // different color if checked vs unchecked
                                    color:
                                        courseState[item[1]].length > 0
                                            ? (theme) =>
                                                  theme.palette.primary.dark
                                            : (theme) =>
                                                  theme.palette.grey.grey400,
                                },
                                // border: "1px solid #E0E0E0"
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: (theme) => theme.palette.grey.grey600,
                                fontSize: "0.9rem",
                            }}
                        >
                            {item[0]}
                        </Typography>
                    </FlexBetween>
                ))}
            </Box>
        </Box>
    );
};

export default LeftPanelMoreInfo;
