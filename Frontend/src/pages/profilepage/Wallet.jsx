import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FlexBetween from "../../components/FlexBetween";
import StyledTextField1 from "../../components/StyledTextField1";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputLabel from "@mui/material/InputLabel";
import { StyledButton } from "../../components/StyledButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const Wallet = ({ userInfo }) => {
    //console.log(userInfo);
    const [widthdrawAmount, setWidthdrawAmount] = React.useState(0);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

    return (
        <FlexBetween
            sx={{
                width: "100%",
                padding: isMobileScreens ? "1.5rem 0" : "2rem",
                flexDirection: "column",
            }}
        >
            <FlexBetween
                sx={{
                    width: "100%",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                    }}
                >
                    My Wallet:&nbsp; $ {userInfo?.wallet}
                </Typography>
            </FlexBetween>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                    width: "100%",
                    mt: "1rem",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "300px",
                        textAlign: "center",
                    }}
                >
                    <InputLabel htmlFor="wallet-course-price">
                        <Typography
                            sx={{
                                mb: "0.5rem",
                                textAlign: "center",
                                color: (theme) => theme.palette.text.secondary,
                                fontSize: "0.9rem",
                            }}
                        >
                            Withdraw Amount in USD
                        </Typography>
                    </InputLabel>
                    <StyledTextField1
                        placeholder="50"
                        multiline
                        maxRows={1}
                        id="wallet-course-price"
                        inputProps={{
                            maxLength: 6,
                        }}
                        InputProps={{
                            startAdornment: (
                                <AttachMoneyIcon
                                    sx={{
                                        color: (theme) => theme.palette.text.primary,
                                        fontSize: "1.5rem",
                                        mr: 0.5,
                                    }}
                                />
                            ),
                        }}
                        onChange={(event) => {
                            if (event.target.value >= 0) {
                                setWidthdrawAmount(event.target.value);
                            }
                        }}
                        value={widthdrawAmount || ""}
                        sx={{
                            p: 0,
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: (theme) => theme.palette.background.default, // or a glass bg
                                borderRadius: "12px",
                                padding: "0.5rem 1rem",
                                "& fieldset": {
                                    borderColor: (theme) => theme.palette.divider,
                                    borderWidth: "1px",
                                },
                                "&:hover fieldset": {
                                    borderColor: (theme) => theme.palette.primary.main,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: (theme) => theme.palette.primary.main,
                                    borderWidth: "2px",
                                },
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: (theme) => theme.palette.text.primary,
                                textAlign: "center",
                            },
                            width: "100%",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center", // Explicit flex centering
                    }}
                >
                    <StyledButton
                        sx={{
                            "&&": {
                                px: "3rem",
                                py: "0.8rem",
                                borderRadius: "12px",
                                margin: "0",
                            },
                        }}
                    >
                        Request Withdraw
                    </StyledButton>
                </Box>
            </Box>
        </FlexBetween>
    );
};

export default Wallet;
