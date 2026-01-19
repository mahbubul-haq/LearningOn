import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

const StyledTextField = styled(TextField)(({ theme }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return {
        marginBottom: "1rem",
        "& .MuiOutlinedInput-root": {
            // Match BasicInfoBottom Add Skill style
            backgroundColor: theme.palette.glassSheet?.background || (theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.8)
                : alpha(theme.palette.common.white, 0.8)),
            backdropFilter: "blur(12px)",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            boxShadow: theme.palette.mode === 'dark'
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.1)",

            // Text color
            "& input": {
                color: theme.palette.text.primary,
                fontWeight: 500,
                // height: "auto", // Let size="small" control height
            },

            // Multiline text color
            "& textarea": {
                color: theme.palette.text.primary,
            },

            "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.1)", // Consistent border
                borderWidth: "1px",
                transition: "all 0.3s ease",
            },

            "&:hover": {
                backgroundColor: theme.palette.glassSheet?.background || (theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.9)
                    : alpha(theme.palette.common.white, 0.9)),
                "& fieldset": {
                    borderColor: theme.palette.primary.main,
                }
            },

            "&.Mui-focused": {
                backgroundColor: theme.palette.glassSheet?.background || (theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 1)
                    : alpha(theme.palette.common.white, 1)),
                boxShadow: theme.palette.mode === 'dark'
                    ? `0 4px 24px rgba(0,0,0,0.5)`
                    : `0 4px 24px rgba(0,0,0,0.15)`,
                "& fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: "1px",
                }
            },

            "&.Mui-error fieldset": {
                borderColor: theme.palette.error.main,
            },
        },

        "& .MuiInputLabel-root": {
            color: theme.palette.text.secondary,
            "&.Mui-focused": {
                color: theme.palette.primary.main,
            },
            "&.Mui-error": {
                color: theme.palette.error.main,
            }
        },

        // Ensure multiline inputs have correct padding
        "& .MuiInputBase-multiline": {
            padding: "8.5px 14px",
        }
    };
});

const GlassTextField = React.forwardRef((props, ref) => {
    return <StyledTextField size="small" ref={ref} {...props} />;
});

export default GlassTextField;
