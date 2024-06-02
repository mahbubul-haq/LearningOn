import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FlexBetween from "../../components/FlexBetween";
import StyledTextField1 from "../../components/StyledInputField1";
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
                {/* <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                    }}
                >
                    $ {userInfo?.wallet}
                </Typography> */}
            </FlexBetween>
            <Box sx={{}}>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "300px",
                        margin: "2rem 0 0.2rem 0",
                        // textAlign: "center",
                    }}
                >
                    <InputLabel htmlFor="course-price">
                        <Typography
                            sx={{
                                mb: "0.2rem",
                                textAlign: "center",
                                color: (theme) => theme.palette.grey.grey800,
                            }}
                        >
                            Withdraw Amount in USD
                        </Typography>
                    </InputLabel>
                    <StyledTextField1
                        placeholder="$50"
                        multiline
                        maxRows={3}
                        id="wallet-course-price"
                        inputProps={{
                            maxLength: 6,
                        }}
                        InputProps={{
                            endAdornment: (
                                <AttachMoneyIcon
                                    sx={{
                                        color: (theme) => theme.palette.grey.grey600,
                                        fontSize: "2rem",
                                    }}
                                    position="end"
                                />
                            ),
                        }}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        //   }}
                        // change font size of input
                        onChange={(event) => {
                            if (event.target.value >= 0) {
                                setWidthdrawAmount(event.target.value);
                            }
                            

                            // if (event.target.value && event.target.value > 0) {
                            //     setErrors({
                            //         ...errors,
                            //         coursePrice: "",
                            //     });
                            // }
                        }}
                        value={widthdrawAmount || ""}
                        sx={{
                            p: 0,
                            "& .MuiInputBase-input": {
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            },
                            width: "100%",
                            maxWidth: "300px",
                            "&&": {
                                p: 0,
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <StyledButton
                        sx={{
                            "&&": {
                                px: "2rem",
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
