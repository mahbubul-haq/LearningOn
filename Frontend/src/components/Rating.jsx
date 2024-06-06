import GradeIcon from '@mui/icons-material/Grade';
import { Box, Typography } from '@mui/material';

const Rating = ({
    rating
}) => {
    //console.log(rating);
  return (
    <Box sx={{
        display: "flex",
        alignItems: "center"
    }}>
        <GradeIcon sx={{
            color: theme => theme.palette.rating,
            mr: "0.2rem",
            fontSize: "1.2rem",
            // border: "1px solid red"
        }}/>
        <Box sx={{
            // border: "1px solid red",
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
            mt: "0.1rem"
        }}>

        <Typography sx={{
            fontWeight: "600",
            fontSize: "inherit",
            m: 0,
            p: 0,
            
        }}>
            {rating.rating}
        </Typography>
        <Typography sx={{
            color: theme => theme.palette.grey.grey400,
            fontSize: "inherit"
        }}>
            &#40;{rating.count}{rating.showText ? " ratings": ""}&#41;
        </Typography>
            </Box>
    </Box>
  )
}

export default Rating