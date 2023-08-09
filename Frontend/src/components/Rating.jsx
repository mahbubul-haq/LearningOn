import React from 'react'
import FlexBetween from './FlexBetween'
import GradeIcon from '@mui/icons-material/Grade';
import { Box, Typography } from '@mui/material';

const Rating = ({
    rating
}) => {
    console.log(rating);
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
            alignSelf: "baseline"
        }}>

        <Typography sx={{
            fontWeight: "600",
            fontSize: "inherit",
            m: 0,
            p: 0,
            lineHeight: "0.5rem"
            
        }}>
            {rating.rating}
        </Typography>
        <Typography sx={{
            color: theme => theme.palette.grey.grey400,
            fontSize: "inherit"
        }}>
            ({rating.count}{rating.showText ? " ratings": ""})
        </Typography>
            </Box>
    </Box>
  )
}

export default Rating