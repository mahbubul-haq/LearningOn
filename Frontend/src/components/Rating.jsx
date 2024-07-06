import { Box, Typography } from "@mui/material";
import { Rating as MuiRating } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledRating = styled(MuiRating)(() => {
    return {
        "& .MuiRating-iconFilled": {
            color: "#ff6d75",
        },
        "& .MuiRating-iconHover": {
            color: "#ff3d47",
        },
    };
});

const Rating = ({ rating }) => {
   // console.log(rating);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
            }}
        >
            <Typography variant="h6">
                {rating.rating ? rating.rating : 4.5}
            </Typography>
            <StyledRating
                sx={{
                    padding: 0,
                    verticalAlign: "middle",
                    // paddingTop: "4.5px", //
                    paddingBottom: "2px", // readOnly causes some space on top
                    overflow: "hidden",
                }}
                defaultValue={2.5}
                value={rating.rating ? rating.rating : 4.5}
                precision={0.5}
                size="small"
                readOnly
                max={rating.oneStar ? 1 : 5}
                // max={1}
            />
            <Typography variant="lightGrey">
                {`(${rating.count ? rating.count : 20})`}
            </Typography>
        </Box>
    );
};

export default Rating;
