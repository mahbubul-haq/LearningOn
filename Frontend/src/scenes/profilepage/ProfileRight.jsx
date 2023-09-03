import React from 'react'
import Box from "@mui/material/Box";
import { useContext } from 'react';
import { ProfilePageContext } from '../../state/ProfilePageContext';
import BasicProfile from './BasicProfile';

const ProfileRight = ({
    userInfo
}) => {

    const { openedTab } = useContext(ProfilePageContext);

  return (
    <Box sx={{
        padding: "2rem"
    }}>
        {openedTab === "profile" && <BasicProfile userInfo={userInfo} />}
        
    </Box>
  )
}

export default ProfileRight